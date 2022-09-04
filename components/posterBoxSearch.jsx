import { Box, Img, Text, VStack, Flex } from '@chakra-ui/react'
import Link from 'next/link'

export default function PosterBoxSearch({ item }) {
  return (
    <Flex
      gap={2}
      rounded='xl'
      w={{ base: '90vw', sm:'100%', md: '65vw', lg: '70vw' }}
      shadow='lg'
      mb={4}
      h='150px'
    >
      <>
        {item.title ? (
          <Link href={`/details/movie/${item.id}`} cursor='pointer' passHref>
            <Box w='130px'>
              <Img
                src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                alt={item?.title}
                boxSize='100%'
                rounded='lg'
                title={item?.title}
              />
            </Box>
          </Link>
        ) : (
          <Link href={`/details/tv/${item.id}`} cursor='pointer' passHref>
            <Box w='130px'>
              <Img
                src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                alt={item?.name}
                boxSize='100%'
                rounded='lg'
                title={item?.name}
              />
            </Box>
          </Link>
        )}
      </>
      <VStack spacing={1} align='start' p={2} w={{base:'70vw', md:'70vw'}}>
        <Box cursor='pointer'>
          {item.title ? (
            <Link href={`/details/movie/${item.id}`} passHref>
              <Text
                fontWeight='bold'
                _hover={{ color: 'blue.200' }}
              >
                {item?.title}
              </Text>
            </Link>
          ) : (
            <Link href={`/details/tv/${item.id}`} passHref>
              <Text
                fontWeight='bold'
                _hover={{ color: 'blue.200' }}
              >
                {item?.name}
              </Text>
            </Link>
          )}
          <Text>
            {item?.release_date?.slice(0, 4) ||
              item?.first_air_date?.slice(0, 4)}
          </Text>
        </Box>

        <Text fontSize='sm' display={{ base: 'none', md: 'block' }}>{`${
          item?.overview?.slice(0, 200) + '...'
        }`}</Text>

        <Text fontSize='sm' display={{ base: 'block', md: 'none' }}>{`${
          item?.overview?.slice(0, 50) + '...'
        }`}</Text>
      </VStack>
    </Flex>
  )
}
