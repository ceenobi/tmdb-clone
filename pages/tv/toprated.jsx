import { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Grid,
  Heading,
  Select,
} from '@chakra-ui/react'
import Head from 'next/head'
import ReactPaginate from 'react-paginate'
import Router, { withRouter } from 'next/router'
import { getTopRatedTv } from '../api/tubine.server'
import { Layout, PosterBox, PosterBoxMobile } from '../../components'
import Loader from '../../lib/loader'

const TopRated = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [sortState, setSortState] = useState('none')
  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  useEffect(() => {
    Router.events.on('routeChangeStart', startLoading)
    Router.events.on('routeChangeComplete', stopLoading)

    return () => {
      Router.events.off('routeChangeStart', startLoading)
      Router.events.off('routeChangeComplete', stopLoading)
    }
  }, [])

  const paginationHandler = (page) => {
    const currentPath = props.router.pathname
    const currentQuery = props.router.query
    currentQuery.page = page.selected + 1

    props.router.push({
      pathname: currentPath,
      query: currentQuery,
    })
  }

  const sortMethods = {
    none: { method: (a, b) => null },
    asc: {
      method: (a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0),
    },
    desc: {
      method: (a, b) => (a.title < b.title ? 1 : a.title > b.title ? -1 : 0),
    },
    popular: {
      method: (a, b) =>
        a.popularity < b.popularity ? -1 : a.popularity > b.popularity ? 1 : 0,
    },
    votes: {
      method: (a, b) =>
        a.vote_average < b.vote_average
          ? -1
          : a.vote_average > b.vote_average
          ? 1
          : 0,
    },
    new: {
      method: (a, b) =>
        a.first_air_date > b.first_air_date
          ? -1
          : a.first_air_date < b.first_air_date
          ? 1
          : 0,
    },
    old: {
      method: (a, b) =>
        a.first_air_date < b.first_air_date
          ? -1
          : a.first_air_date < b.first_air_date
          ? 1
          : 0,
    },
  }

  let content = null
  if (isLoading) content = (
    <Flex justify='center' mx='auto'>
      <Loader />
    </Flex>
  )
  else {
    content = (
      <>
        {props.tv?.sort(sortMethods[sortState].method).map((item) => (
          <Box key={item.id} mx='auto' display={{ base: 'none', md: 'block' }}>
            <PosterBox item={item} />
          </Box>
        ))}
        {props.tv?.sort(sortMethods[sortState].method).map((item) => (
          <Box key={item.id} mx='auto' display={{ base: 'block', md: 'none' }}>
            <PosterBoxMobile item={item} />
          </Box>
        ))}
      </>
    )
  }

  const pageIndex = Math.ceil(props.totalPages / 10)

  return (
    <>
      <Head>
        <title>Top Rated Shows</title>
        <meta name='description' content='List of top rated shows' />
      </Head>
      <Box maxW='container.xl' mx='auto' py='2rem'>
        <Flex
          justify='space-between'
          direction={{ base: 'column', md: 'row' }}
          mb={4}
          px={4}
          align='center'
        >
          <Heading as='h2' size={{ base: 'sm', md: 'md' }} mb={3}>
            Top Rated Shows
          </Heading>
          <Box w={{ base: '100%', md: '250px' }}>
            Sort results by:
            <Select
              rounded='none'
              defaultValue={'none'}
              onChange={(e) => setSortState(e.target.value)}
            >
              <option value='none'>None</option>
              <option value='asc'>{`Title (A-Z)`}</option>
              <option value='desc'>{`Title (Z-A)`}</option>
              <option value='popular'>Popularity</option>
              <option value='votes'>Top Rated</option>
              <option value='new'>New to Old</option>
              <option value='old'>Old to New</option>
            </Select>
          </Box>
        </Flex>
        <Box>
          <Grid
            templateColumns={{
              sm: 'repeat(1, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
              xl: 'repeat(5, 1fr)',
              '2xl': 'repeat(5, 1fr)',
              base: 'repeat(1, 1fr)',
            }}
            gap={4}
            mb='2rem'
          >
            {content}
          </Grid>
          <Flex justify='center' px={4}>
            <ReactPaginate
              previousLabel={'prev'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              activeClassName={'active'}
              containerClassName={'pagination'}
              initialPage={props.currentPage - 1}
              pageCount={pageIndex}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              disabledClassName={'disabled'}
              onPageChange={paginationHandler}
              renderOnZeroPageCount={null}
            />
          </Flex>
        </Box>
      </Box>
    </>
  )
}

export default withRouter(TopRated)

TopRated.Layout = Layout

export async function getServerSideProps({ query, req, res }) {
   res.setHeader(
     'Cache-Control',
     'public, s-maxage=10, stale-while-revalidate=59'
   )
  try {
    const page = query.page || 1
    const tv = await getTopRatedTv(page)
    return {
      props: {
        tv: tv.results,
        currentPage: tv.page,
        totalResults: tv.total_results,
        totalPages: tv.total_pages,
      },
    }
  } catch (error) {
    console.error('Error fetching data', error)
  }
}
