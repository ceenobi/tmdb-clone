import { useState, useEffect } from 'react'
import { ScaleFade, Box, Flex, Text, Button, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import ReactPaginate from 'react-paginate'
import Router, { withRouter, useRouter } from 'next/router'

import { Layout, PosterBoxSearch } from '../components'
import { getSearchDetails } from '../pages/api/tubine.server'
import Loader from '../lib/loader'

const Search = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [filteredList, setFilteredList] = useState(props.search)
  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)
  const router = useRouter()

  let keyword = router.query['query']

  const filteredData = props.search.filter((res) => {
     const filter = res.title || res.name === keyword
     if (keyword === '') {
       return res
     } else {
       return res.title || res.name || filter
     }
  })

  useEffect(() => {
    Router.events.on('routeChangeStart', startLoading)
    Router.events.on('routeChangeComplete', stopLoading)

    return () => {
      Router.events.off('routeChangeStart', startLoading)
      Router.events.off('routeChangeComplete', stopLoading)
    }
  }, [])

  const movieTotal = filteredData?.filter((item) => item.media_type === 'movie')
  const tvTotal = filteredData?.filter((item) => item.media_type === 'tv')

  const arrayOfMovieKeys = Object.keys(movieTotal)
  const arrayOfMovieData = Object.keys(movieTotal).map((key) => movieTotal[key])
  const formattedMovieArray = []
  arrayOfMovieKeys.forEach((key, index) => {
    const formmatedData = { ...arrayOfMovieData[index] }
    formmatedData['documentId'] = key
    formattedMovieArray.push(formmatedData)
  })

  const arrayOfTvKeys = Object.keys(tvTotal)
  const arrayOfTvData = Object.keys(tvTotal).map((key) => tvTotal[key])
  const formattedTvArray = []
  arrayOfTvKeys.forEach((key, index) => {
    const formmatedData = { ...arrayOfTvData[index] }
    formmatedData['documentId'] = key
    formattedTvArray.push(formmatedData)
  })

  const filterByMovie = () => {
    var updatedList = [...filteredData]
    updatedList = updatedList.filter((item) => {
      return item.media_type === 'movie'
    })
    setFilteredList(updatedList)
  }
  const filterByTv = () => {
    var updatedList = [...filteredData]
    updatedList = updatedList.filter((item) => {
      return item.media_type === 'tv'
    })
    setFilteredList(updatedList)
  }

  if (keyword && filteredList?.length === 0) {
    return (
      <Flex justify='center' py='5rem' m='auto'>
        <Text as='h2' fontSize='lg'>
          Oops...result not found!
        </Text>
      </Flex>
    )
  }

  const paginationHandler = (page) => {
    const currentPath = props.router.pathname
    const currentQuery = props.router.query
    currentQuery.page = page.selected + 1

    props.router.push({
      pathname: currentPath,
      query: currentQuery,
    })
  }

  let content = null
  if (isLoading)
    content = (
      <Flex justify='center' h='100vh' w='full' m='auto' align='center'>
        <Loader />
      </Flex>
    )
  else {
    content = (
      <>
        {filteredData?.map((item) => (
          <Box key={item.id} mx='auto' mb={4}>
            <PosterBoxSearch item={item} />
          </Box>
        ))}
      </>
    )
  }

  const pageIndex = Math.ceil(props.totalPages / 2)

  return (
    <>
      <Head>
        <title>{keyword} Results</title>
        <meta name='description' content='Search Results' />
      </Head>
      <ScaleFade initialScale={0.9} in='true'>
        <Box maxW='container.xl' mx='auto' py='2rem'>
          <Flex
            justify='space-between'
            px={{ base: '4', md: '10' }}
            gap={10}
            direction={{ base: 'column', md: 'row' }}
          >
            <Box
              w={{ base: 'full', md: '200px' }}
              rounded='lg'
              border='1px'
              borderColor='#CBD5E0'
              h={{ base: 'auto', md: '200px' }}
            >
              <Text
                fontSize='lg'
                fontWeight='bold'
                mb={3}
                p={3}
                bg='paint.blue'
                color='whiteAlpha.900'
              >
                Search Results
              </Text>
              <Stack
                spacing={3}
                p={3}
                align='start'
                fontSize='lg'
                direction={{ base: 'row', md: 'column' }}
              >
                <Flex
                  gap={3}
                  cursor='pointer'
                  align='center'
                  onClick={filterByMovie}
                >
                  <Text>Movies</Text>
                  <Button variant='solid' size='sm'>
                    {formattedMovieArray.length}
                  </Button>
                </Flex>
                <Flex
                  gap={3}
                  cursor='pointer'
                  align='center'
                  onClick={filterByTv}
                >
                  <Text>Tv</Text>
                  <Button variant='solid' size='sm'>
                    {formattedTvArray.length}
                  </Button>
                </Flex>
              </Stack>
            </Box>
            <Box mx='auto'>
              <Box>{content}</Box>
            </Box>
          </Flex>
        </Box>
        <Flex justify='center' px={4} py={2} mx='auto' mb={4}>
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
      </ScaleFade>
    </>
  )
}

export default withRouter(Search)

Search.Layout = Layout

export async function getServerSideProps(context) {
  try {
    const page = context.query.page || 1
    const queryTerm = context.query['query']
    const search = await getSearchDetails(queryTerm, page)
    // console.log(search.results)
    return {
      props: {
        search: search.results,
        currentPage: search.page,
        totalResults: search.total_results,
        totalPages: search.total_pages,
      },
    }
  } catch (error) {
    console.error('Error fetching data', error)
  }
}
