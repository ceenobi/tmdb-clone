import { useState } from 'react'
import {
  Box,
  Heading,
  Flex,
  Text,
  HStack,
  VStack,
  Stack,
  Icon,
  Image,
  Button,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import Head from 'next/head'
import { FiInstagram } from 'react-icons/fi'
import { SiImdb } from 'react-icons/si'

import { getPersonDetails } from '../api/tubine.server'
import { PosterBox, Layout } from '../../components'

export default function PersonId({ person }) {
  const [showMore, setShowMore] = useState(false)
  if (!person) {
    return (
      <Box>
        <Heading as='h2' size='md'>
          Oops...person not found!
        </Heading>
      </Box>
    )
  }

  return (
    <>
      <Head>
        <title>{person?.name} Details</title>
        <meta name='description' content='Person information' />
      </Head>
      <Box maxW='container.xl' mx='auto' py='4rem'>
        <Stack
          px={{ base: '4', md: '10' }}
          spacing='3rem'
          direction={{ base: 'column', md: 'row' }}
        >
          <Box>
            <Box
              h={{ base: '250px', md: '350px' }}
              w='250px'
              mb={4}
              mx={{ base: 'auto', md: '0' }}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500/${person?.profile_path}`}
                alt={person?.name}
                boxSize='100%'
                rounded='lg'
              />
            </Box>
            <Heading
              as='h2'
              size={{ base: 'md', md: 'lg' }}
              display={{ base: 'block', md: 'none' }}
              align='center'
              mb={3}
            >
              {person?.name}
            </Heading>
            <HStack
              spacing={4}
              mb='2rem'
              justify={{ base: 'center', md: 'start' }}
            >
              <Link
                href={`https://instagram.com/${person?.external_ids?.instagram_id}`}
                isExternal
              >
                <Icon as={FiInstagram} boxSize='30px' />
              </Link>
              <Link
                href={`https://imdb.com/name/${person?.external_ids?.imdb_id}`}
                isExternal
              >
                <Icon as={SiImdb} boxSize='30px' />
              </Link>
            </HStack>
            <Box>
              <Heading as='h2' size='sm' mb={4}>
                Personal Info
              </Heading>
              <VStack spacing={3} align='start'>
                <Box>
                  <Text fontWeight='bold'>Known for</Text>
                  <Text>{person?.known_for_department}</Text>
                </Box>
                <Box>
                  <Text fontWeight='bold'>Known credits</Text>
                  <Text>{person?.combined_credits?.cast.length}</Text>
                </Box>
                <Box>
                  <Text fontWeight='bold'>Gender</Text>
                  <Text>{person?.gender}</Text>
                </Box>
                <Box>
                  <Text fontWeight='bold'>Birthday</Text>
                  <Text>{person?.birthday}</Text>
                </Box>
                <Box>
                  <Text fontWeight='bold'>Place of birth</Text>
                  <Text>{person?.place_of_birth}</Text>
                </Box>
                <Box>
                  <Text fontWeight='bold'>Also known as</Text>
                  {person?.also_known_as?.map((item, i) => (
                    <Text key={i}>{item}</Text>
                  ))}
                </Box>
              </VStack>
            </Box>
          </Box>
          <Box w={{ base: 'full', md: '60%', lg: '70%', xl: '75%' }}>
            <Flex direction='column' gap={8} align='start'>
              <Heading
                as='h2'
                size={{ base: 'md', md: 'lg' }}
                display={{ base: 'none', md: 'block' }}
                mb={3}
              >
                {person?.name}
              </Heading>
              <Box>
                <Text fontWeight='bold' mb={2}>
                  Biography
                </Text>
                <Text mb={3}>
                  {showMore
                    ? person?.biography
                    : `${person?.biography?.substring(0, 600)}` + '...'}
                </Text>
                {person?.biography?.length > 600 && (
                  <Button
                    variant='unstyled'
                    color='blue.200'
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? 'Show less' : 'Show more'}
                  </Button>
                )}
              </Box>
              <Box w='full'>
                <Text fontWeight='bold'>Known for</Text>
                <Flex align='center' py={4}>
                  <Flex
                    overflowX='auto'
                    flexWrap='nowrap'
                    scroll='smooth'
                    scrollbar='hide'
                  >
                    {person?.combined_credits?.cast?.map((item, id) => (
                      <PosterBox item={item} key={id} />
                    ))}
                  </Flex>
                </Flex>
              </Box>
              <Box w='full'>
                <Text fontWeight='bold' mb={3}>
                  Acting
                </Text>
                <Box shadow='lg' w='100%'>
                  {person?.combined_credits?.cast
                    ?.sort((a, b) => a - b)
                    .map((item, id) => (
                      <HStack
                        spacing={{ base: 2, md: 3 }}
                        key={id}
                        borderBottom='1px'
                        p={4}
                        fontSize={{ base: 'sm', md: 'md' }}
                      >
                        <Text>
                          {item?.release_date?.slice(0, 4) ||
                            item?.first_air_date?.slice(0, 4)}
                        </Text>
                        <Text>&#9658;</Text>
                        <NextLink href={`/details/${item.id}`} passHref>
                          <Link fontWeight='bold'>
                            {item?.title || item?.name}
                          </Link>
                        </NextLink>
                        <Text>as</Text>
                        <Text>{item?.character}</Text>
                      </HStack>
                    ))}
                </Box>
              </Box>
            </Flex>
          </Box>
        </Stack>
      </Box>
    </>
  )
}

PersonId.Layout = Layout

export async function getServerSideProps(context) {
  try {
    const { person_id } = context.params
    const person = await getPersonDetails(person_id)
    return {
      props: { person },
    }
  } catch (error) {
    console.error('Error fetching data', error)
  }
}
