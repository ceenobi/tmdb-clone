import { useState } from 'react'
import {
  Box,
  Heading,
  Flex,
  Text,
  Avatar,
  HStack,
  VStack,
  Stack,
  Icon,
  Img,
  Button,
  Link,
  Spacer
} from '@chakra-ui/react'
import { AiFillStar } from 'react-icons/ai'
import { FiLink } from 'react-icons/fi'
import NextLink from 'next/link'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { VscTasklist } from 'react-icons/vsc'

import { getMovieDetails } from '../../api/tubine.server'
import { PosterBox, Layout } from '../../../components'
import { AuthService } from '../../../lib/context'
import { useToastHook } from '../../../hooks/useToast'

export default function MovieId({ movie }) {
  const [showMore, setShowMore] = useState(false)
  const [like, setLike] = useState(false)
  const [saved, setSaved] = useState(false)
  const { db, arrayUnion, updateDoc, auth, doc } = AuthService()
  const [user] = useAuthState(auth)
  const [handleToast] = useToastHook()

  const movieID = doc(db, 'users', `${user?.email}`)

  if (!movie) {
    return (
      <Box>
        <Heading as='h2' size='md'>
          Oops...movie not found!
        </Heading>
      </Box>
    )
  }

  const credits = movie?.credits?.crew?.filter(
    (item) => item.job === 'Director'
  )
  const writer = movie?.credits?.crew?.filter(
    (item) => item.job === 'Screenplay'
  )

  const savedShow = async () => {
    if (user?.email) {
      setLike(!like)
      setSaved(true)
      await updateDoc(movieID, {
        savedTitles: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.poster_path,
          premier: movie.release_date,
          overview: movie.overview,
        }),
      })
    } else {
      handleToast({
        message: 'Please login to save a show',
        status: 'warning',
      })
    }
  }

  return (
    <>
      <Head>
        <title>{movie.title} Details</title>
        <meta name='description' content='Movie info' />
      </Head>
      <Box w='full'>
        <Box w='full' h={{ base: '820px', md: '620px', lg: '550px' }}>
          <Box position='relative'>
            <Box
              pos='absolute'
              w='full'
              h={{ base: '820px', md: '620px', lg: '550px' }}
              top='0%'
              zIndex={2}
              bgGradient='linear(to-r, rgba(0, 0 ,0 ,2.7), rgba(0, 0 ,0 ,0.5))'
              opacity='1'
            />
            <Box w='full' h={{ base: '200px', md: '620px', lg: '550px' }}>
              <Img
                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                alt={movie?.title}
                boxSize='100%'
              />
            </Box>
            <Box maxW='container.xl' mx='auto' mt='4rem'>
              <Stack
                spacing='2.5rem'
                px={{ base: '4', md: '10' }}
                pos='absolute'
                top='10%'
                zIndex={2}
                direction={{ base: 'column', md: 'row' }}
              >
                <Box
                  width={{ base: '140px', md: '250px', lg: '300px' }}
                  height={{ base: '150px', md: '300px', lg: '400px' }}
                >
                  <Img
                    src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                    alt={movie?.title}
                    width='100%'
                    height='100%'
                  />
                </Box>
                <Spacer />
                <Box color='#fff' w={{ base: '90vw', md: '55vw', lg: '60vw' }}>
                  <HStack spacing={2} justify={{ base: 'center', md: 'start' }}>
                    <Heading as='h2' size={{ base: 'sm', md: 'md', lg: 'lg' }}>
                      {movie?.title}
                    </Heading>
                    <Text
                      fontSize={{ base: 'md', md: '2xl', lg: '3xl' }}
                      color='whiteAlpha.800'
                    >
                      ({movie?.release_date?.slice(0, 4)})
                    </Text>
                  </HStack>
                  <Flex gap={3} flexWrap='wrap' mt={3}>
                    <Text>{movie?.release_date}</Text>
                    <Text>{movie?.production_countries?.[0]?.iso_3166_1}</Text>
                    <Text mt={1}>*</Text>
                    {movie?.genres?.map((item) => (
                      <Text key={item.id}>{item.name},</Text>
                    ))}
                    <Text mt={1}>*</Text>
                    <Text>{movie?.runtime}mins</Text>
                  </Flex>
                  <VStack spacing={4} mt={5} align='start'>
                    <Flex
                      gap={8}
                      align='center'
                      justify={{ base: 'center', md: 'start' }}
                      flexWrap='wrap'
                    >
                      <Flex gap={1} align='center'>
                        <Icon as={AiFillStar} color='yellow' fontSize='25px' />
                        <Text fontSize='20px'>
                          {movie?.vote_average?.toFixed(2)}/10
                        </Text>
                      </Flex>
                      <Box onClick={savedShow}>
                        {like ? (
                          <Button variant='unstyled' leftIcon={<VscTasklist />}>
                            saved
                          </Button>
                        ) : (
                          <Button
                            variant='unstyled'
                            leftIcon={<AiOutlineUnorderedList />}
                          >
                            Add to watchlist
                          </Button>
                        )}
                      </Box>
                    </Flex>
                    <Text color='whiteAlpha.800'>{movie?.tagline}</Text>
                    <Box>
                      <Heading as='h2' size='sm'>
                        Overview
                      </Heading>
                      <Text mt={2} fontSize='sm'>
                        {movie?.overview}
                      </Text>
                    </Box>
                    <Flex justify='space-between' w='full' flexWrap='wrap'>
                      {credits?.slice(0, 2).map((item, index) => (
                        <VStack spacing={2} key={index} align='start'>
                          <Text mt={2} fontWeight='bold'>
                            {item.name}
                          </Text>
                          <Text mt={2}>{item.job}</Text>
                        </VStack>
                      ))}
                      {writer?.slice(0, 2).map((item, index) => (
                        <VStack spacing={2} key={index} align='start'>
                          <Text mt={2} fontWeight='bold'>
                            {item.name}
                          </Text>
                          <Text mt={2}>{item.department}</Text>
                        </VStack>
                      ))}
                    </Flex>
                  </VStack>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
      <Flex
        p={{ base: '4', md: '10' }}
        gap='3rem'
        mt='2rem'
        maxW='container.xl'
        mx='auto'
        direction={{ base: 'column', md: 'row' }}
      >
        <Box w={{ base: 'full', md: '60vw', lg: '67vw', xl: '75vw' }}>
          <Box>
            <Heading as='h2' size='sm' mb={4}>
              Casts
            </Heading>
            <Flex align='center'>
              <Flex
                overflowX='auto'
                flexWrap='nowrap'
                scroll='smooth'
                scrollbar='hide'
              >
                {movie?.credits?.cast?.map((item, index) => (
                  <Box key={index} align='center' cursor='pointer' mr='2rem'>
                    <NextLink href={`/person/${item.id}`} passHref>
                      <Avatar
                        src={`https://image.tmdb.org/t/p/original/${item?.profile_path}`}
                        size='lg'
                        name={item.name}
                        mx='auto'
                      />
                    </NextLink>
                    <Text fontWeight='bold'>{item?.name}</Text>
                    <Text fontSize='sm'>{item?.character}</Text>
                  </Box>
                ))}
              </Flex>
            </Flex>
          </Box>
          <Box mt={8}>
            <Heading as='h2' size='sm' mb={4}>
              Reviews
            </Heading>
            {movie?.reviews?.results.length > 0 ? (
              <Box rounded='xl' shadow='lg'>
                {movie?.reviews?.results?.slice(0, 3).map((item, id) => (
                  <Flex
                    justify='space-between'
                    mb={4}
                    p={4}
                    gap={6}
                    key={id}
                    direction={{ base: 'column', md: 'row' }}
                  >
                    <Avatar
                      src={`https://image.tmdb.org/t/p/original/${item?.author_details.avatar_path}`}
                      size='lg'
                      name={item?.author_details?.name}
                    />
                    <Box>
                      <Text fontWeight='bold'>{item?.author}</Text>
                      <Text fontSize='sm'>
                        {' '}
                        {showMore
                          ? item?.content
                          : `${item?.content.substring(0, 300)}` + '...'}
                      </Text>
                      <Button
                        variant='unstyled'
                        color='blue.200'
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore ? 'Show less' : 'Show more'}
                      </Button>
                    </Box>
                  </Flex>
                ))}
              </Box>
            ) : (
              <Text>
                No reviews for{' '}
                <Box as='span' fontWeight='bold'>
                  {`"${movie.title}"`}
                </Box>{' '}
                yet.
              </Text>
            )}
          </Box>
          <Box mt={8}>
            <Heading as='h2' size='sm' mb={4}>
              Recommendations
            </Heading>
            <Flex align='center'>
              {movie?.recommendations?.results.length > 0 ? (
                <>
                  <Flex
                    overflowX='auto'
                    flexWrap='nowrap'
                    scroll='smooth'
                    scrollbar='hide'
                  >
                    {movie?.recommendations?.results?.map((item, id) => (
                      <PosterBox item={item} key={id} />
                    ))}
                  </Flex>
                </>
              ) : (
                <Text>
                  No recommendations for{' '}
                  <Box as='span' fontWeight='bold'>
                    {`"${movie.title}"`}
                  </Box>{' '}
                  at the moment.
                </Text>
              )}
            </Flex>
          </Box>
        </Box>
        <Box w={{ base: 'full', md: 'full' }} align='start'>
          <Heading as='h2' size='sm' mb={4}>
            Additional
          </Heading>
          <VStack spacing={4} align='start'>
            <Box>
              <Text fontWeight='bold'>Visit</Text>
              <Link href={movie?.homepage} isExternal>
                <Icon as={FiLink} fontSize='20px' />
              </Link>
            </Box>
            <Box>
              <Text fontWeight='bold'>Status</Text>
              <Text>{movie?.status}</Text>
            </Box>
            <Box>
              <Text fontWeight='bold'>Budget</Text>
              <Text>&#36;{movie?.budget?.toFixed(2)}</Text>
            </Box>
            <Box>
              <Text fontWeight='bold'>Revenue</Text>
              <Text>&#36;{movie?.revenue?.toFixed(2)}</Text>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </>
  )
}

MovieId.Layout = Layout

export async function getServerSideProps(context) {
  try {
    const { movie_id } = context.params
    const movie = await getMovieDetails(movie_id)
    return {
      props: { movie },
    }
  } catch (error) {
    console.error('Error fetching data', error)
  }
}
