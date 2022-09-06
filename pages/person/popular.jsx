import { useState, useEffect } from 'react'
import { Box, Heading, Flex, VStack, Text } from '@chakra-ui/react'
import Head from 'next/head'
import ReactPaginate from 'react-paginate'
import Router, { withRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import { Layout } from '../../components'
import { getPersonUrl } from '../api/tubine.server'
import Loader from '../../lib/loader'

const Popular = (props) => {
  const [isLoading, setIsLoading] = useState(false)
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

  let content = null
  if (isLoading)
    content = (
      <Flex justify='center' mx='auto'>
        <Loader />
      </Flex>
    )
  else {
    content = (
      <>
        {props.person?.map((item) => (
          <Link href={`/person/${item?.id}`} key={item.id}>
            <Box
              mx='auto'
              shadow='md'
              w={{ base: '160px', md: '220px' }}
              mb={4}
              cursor='pointer'
            >
              <Box>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${item?.profile_path}`}
                  alt={item?.name}
                  width='250px'
                  height='250px'
                  blurDataURL='URL'
                  placeholder='blur'
                />
              </Box>
              <VStack spacing={1} align='start' p={2}>
                <Text fontWeight='bold'>{item.name}</Text>
                {item?.known_for?.slice(0, 1).map((i) => (
                  <Text key={i} fontSize='sm'>
                    {i.title}
                  </Text>
                ))}
              </VStack>
            </Box>
          </Link>
        ))}
      </>
    )
  }

  const pageIndex = Math.ceil(props.totalPages / 10)

  return (
    <>
      <Head>
        <title>Popular People</title>
        <meta name='description' content='List of Popular people' />
      </Head>
      <Box maxW='container.xl' mx='auto' py='2rem' px={4}>
        <Flex direction={{ base: 'column', md: 'row' }} mb={4} align='center'>
          <Heading as='h2' size={{ base: 'sm', md: 'md' }} mb={3}>
            Popular people
          </Heading>
        </Flex>
        <Box>
          <Flex flexWrap='wrap' gap={4} mb='2rem' mx='auto'>
            {content}
          </Flex>
        </Box>
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
    </>
  )
}
export default withRouter(Popular)

Popular.Layout = Layout

export async function getServerSideProps({ query }) {
  try {
    const page = query.page || 1
    const person = await getPersonUrl(page)
    return {
      props: {
        person: person.results,
        currentPage: person.page,
        totalResults: person.total_results,
        totalPages: person.total_pages,
      },
    }
  } catch (error) {
    console.error('Error fetching data', error)
  }
}
