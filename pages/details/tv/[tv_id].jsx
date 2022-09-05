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
} from '@chakra-ui/react'
import { AiFillStar } from 'react-icons/ai'
import { FiLink } from 'react-icons/fi'
import NextLink from 'next/link'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { VscTasklist } from 'react-icons/vsc'

import { getTvDetails } from '../../api/tubine.server'
import { PosterBox, Layout } from '../../../components'
import { AuthService } from '../../../lib/context'
import { useToastHook } from '../../../hooks/useToast'

export default function TvId({ tv }) {
  const [showMore, setShowMore] = useState(false)
  const [like, setLike] = useState(false)
  const [saved, setSaved] = useState(false)
  const { db, arrayUnion, updateDoc, auth, doc } = AuthService()
  const [user] = useAuthState(auth)
  const [handleToast] = useToastHook()
  const movieID = doc(db, 'users', `${user?.email}`)

  if (!tv) {
    return (
      <Box>
        <Heading as='h2' size='md'>
          Oops...tv not found!
        </Heading>
      </Box>
    )
  }

  const credits = tv?.credits?.crew?.filter(
    (item) => item.job === 'Executive Producer'
  )
  const writer = tv?.credits?.crew?.filter(
    (item) => item.department === 'Writing'
  )

  const savedShow = async () => {
    if (user?.email) {
      setLike(!like)
      setSaved(true)
      await updateDoc(movieID, {
        savedTitles: arrayUnion({
          id: tv.id,
          title: tv.name,
          img: tv.poster_path,
          premier: tv.first_air_date,
          overview: tv.overview,
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
        <title>{tv?.name} Details</title>
        <meta name='description' content='Tv info' />
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
                src={`https://image.tmdb.org/t/p/original/${tv?.backdrop_path}`}
                alt={tv?.title}
                boxSize='100%'
              />
            </Box>
            <Box maxW='container.xl' mx='auto'>
              <Stack
                spacing='2.5rem'
                px={{ base: '4', md: '10' }}
                pos='absolute'
                top='10%'
                zIndex={2}
                direction={{ base: 'column', md: 'row' }}
                align='center'
              >
                <Flex
                  mr='auto'
                  width={{ base: '140px', md: '200px', lg: '300px' }}
                  height={{ base: '150px', md: '250px', lg: '400px' }}
                >
                  <Img
                    src={`https://image.tmdb.org/t/p/original/${tv?.poster_path}`}
                    alt={tv?.name}
                    width='100%'
                    height='100%'
                  />
                </Flex>
                <Box
                  color='#fff'
                  w={{ base: 'full', md: '80%', lg: '65%', xl: '70%' }}
                >
                  <HStack spacing={2} justify={{ base: 'center', md: 'start' }}>
                    <Heading as='h2' size={{ base: 'sm', md: 'md', lg: 'lg' }}>
                      {tv?.name}
                    </Heading>
                    <Text
                      fontSize={{ base: 'md', md: '2xl', lg: '3xl' }}
                      color='whiteAlpha.800'
                    >
                      ({tv?.first_air_date?.slice(0, 4)})
                    </Text>
                  </HStack>
                  <Flex gap={2} flexWrap='wrap' mt={3}>
                    <Text>{tv?.release_date}</Text>
                    <Text>{tv?.production_countries?.[0]?.iso_3166_1}</Text>
                    <Text mt={1}>*</Text>
                    {tv?.genres?.map((item) => (
                      <Text key={item.id}>{item.name},</Text>
                    ))}
                    <Text mt={1}>*</Text>
                    <Text>{tv?.episode_run_time}mins</Text>
                  </Flex>
                  <VStack spacing={2} mt={5} align='start'>
                    <Flex
                      gap={4}
                      align='center'
                      justify={{ base: 'center', md: 'start' }}
                    >
                      <Flex gap={1} align='center'>
                        <Icon as={AiFillStar} color='yellow' fontSize='25px' />
                        <Text fontSize='20px'>
                          {`${tv?.vote_average?.toFixed(2)}/10`}
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
                    <Text color='whiteAlpha.800'>{tv?.tagline}</Text>
                    <Box>
                      <Heading as='h2' size='sm'>
                        Overview
                      </Heading>
                      <Text mt={2} fontSize='sm'>
                        {tv?.overview}
                      </Text>
                    </Box>
                    <Flex justify='space-between' w='full' flexWrap='wrap'>
                      {credits?.slice(0, 2).map((item, index) => (
                        <VStack spacing={2} key={index} align='start'>
                          <Text mt={2} fontWeight='bold'>
                            {item?.name}
                          </Text>
                          <Text mt={2}>{item.job}</Text>
                        </VStack>
                      ))}
                      {writer?.slice(0, 1).map((item, index) => (
                        <VStack spacing={2} key={index} align='start'>
                          <Text mt={2} fontWeight='bold'>
                            {item?.name}
                          </Text>
                          <Text mt={2}>{item?.department}</Text>
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
      <Stack
        p={{ base: '4', md: '10' }}
        spacing='4rem'
        mt='2rem'
        maxW='container.xl'
        mx='auto'
        direction={{ base: 'column', md: 'row' }}
      >
        <Box w={{ base: 'full', md: '60%', lg: '65%', xl: '75%' }}>
          <Box>
            <Heading as='h2' size='sm' mb={4}>
              Casts
            </Heading>
            <Flex align='center'>
              {tv?.credits?.cast?.length > 0 ? (
                <Flex
                  overflowX='auto'
                  flexWrap='nowrap'
                  scroll='smooth'
                  scrollbar='hide'
                >
                  {tv?.credits?.cast?.map((item, i) => (
                    <Box key={i} align='center' cursor='pointer' mr='2rem'>
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
              ) : (
                <Text>
                  Casts for{' '}
                  <Box as='span' fontWeight='bold'>
                    {`"${tv.name}"`}
                  </Box>{' '}
                  is unavailable.
                </Text>
              )}
            </Flex>
          </Box>
          <Box mt={8}>
            <Heading as='h2' size='sm' mb={4}>
              Seasons
            </Heading>
            <Flex align='center'>
              <Flex
                overflowX='auto'
                flexWrap='nowrap'
                scroll='smooth'
                scrollbar='hide'
              >
                {tv?.seasons?.map((item, i) => (
                  <Box key={i} mr='1.3rem'>
                    <Box w='150px' h='200px'>
                      <Img
                        src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                        alt={item?.name}
                        boxSize='100%'
                        rounded='xl'
                      />
                    </Box>
                    <Text>{item?.name}</Text>
                  </Box>
                ))}
              </Flex>
            </Flex>
          </Box>
          <Box mt={8}>
            <Heading as='h2' size='sm' mb={4}>
              Reviews
            </Heading>
            {tv?.reviews?.results?.length > 0 ? (
              <Box rounded='xl' shadow='lg'>
                {tv?.reviews?.results?.slice(0, 3).map((item, id) => (
                  <Flex
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
                  {`"${tv.name}"`}
                </Box>{' '}
                show yet.
              </Text>
            )}
          </Box>
          <Box mt={8}>
            <Heading as='h2' size='sm' mb={4}>
              Recommendations
            </Heading>
            {tv?.recommendations?.results.length > 0 ? (
              <Flex align='center'>
                <Flex
                  overflowX='auto'
                  flexWrap='nowrap'
                  scroll='smooth'
                  scrollbar='hide'
                >
                  {tv?.recommendations?.results?.map((item, id) => (
                    <PosterBox item={item} key={id} />
                  ))}
                </Flex>
              </Flex>
            ) : (
              <Text>
                No recommendations for{' '}
                <Box as='span' fontWeight='bold'>
                  {`"${tv.name}"`}
                </Box>{' '}
                show yet.
              </Text>
            )}
          </Box>
        </Box>
        <Box w='full' align='start'>
          <Heading as='h2' size='sm' mb={4}>
            Additional
          </Heading>
          <VStack spacing={4} align='start'>
            <Box>
              <Text fontWeight='bold'>Visit</Text>
              <Link href={tv?.homepage} isExternal>
                <Icon as={FiLink} fontSize='20px' cursor='pointer' />
              </Link>
            </Box>
            <Box>
              <Text fontWeight='bold'>Status</Text>
              <Text>{tv?.status}</Text>
            </Box>
            <Box>
              <Text fontWeight='bold' mb={2}>
                Network
              </Text>
              <Text>
                {tv?.networks?.map((item) => (
                  <Img
                    src={`https://image.tmdb.org/t/p/original/${item?.logo_path}`}
                    w='80px'
                    h='60px'
                    alt={item.name}
                    key={item.id}
                    mb={4}
                  />
                ))}
              </Text>
            </Box>
            <Box>
              <Text fontWeight='bold'>Type</Text>
              <Text>{tv?.type}</Text>
            </Box>
            <Box>
              <Text fontWeight='bold'>Original Language</Text>
              <Text>{tv?.original_language}</Text>
            </Box>
          </VStack>
        </Box>
      </Stack>
    </>
  )
}

TvId.Layout = Layout

export async function getServerSideProps(context) {
  try {
    const { tv_id } = context.params
    const tv = await getTvDetails(tv_id)
    return {
      props: { tv },
    }
  } catch (error) {
    console.error('Error fetching data', error)
  }
}
