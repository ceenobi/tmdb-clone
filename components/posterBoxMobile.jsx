import { Box, Img, Text, VStack, Flex } from '@chakra-ui/react'
import Link from 'next/link'

export default function PosterBoxMobile({ item }) {
  return (
    <Flex
      gap={2}
      rounded='xl'
      w='90vw'
      shadow='lg'
      mb={3}
    >
      <Box w='120px'>
        {item.title ? (
          <Link href={`/details/movie/${item.id}`}>
            <Img
              src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
              alt={item?.title}
              w='full'
              h='140px'
              rounded='lg'
              title={item?.title}
            />
          </Link>
        ) : (
          <Link href={`/details/tv/${item.id}`}>
            <Img
              src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
              alt={item?.name}
              w='full'
              h='140px'
              rounded='lg'
              title={item?.name}
            />
          </Link>
        )}
      </Box>
      <VStack spacing={2} align='start' p={2}>
        <Box>
          <Text fontWeight='bold' _hover={{ color: 'blue.200' }}>
            {item?.title || item?.name}
          </Text>
          <Text>
            {item?.release_date?.slice(0, 4) ||
              item?.first_air_date?.slice(0, 4)}
          </Text>
        </Box>

        <Text fontSize='sm' display={{ base: 'none', md: 'block' }}>{`${
          item?.overview?.slice(0, 200) + '...'
        }`}</Text>

        <Text fontSize='sm' display={{ base: 'block', md: 'none' }}>{`${
          item?.overview?.slice(0, 60) + '...'
        }`}</Text>
      </VStack>
    </Flex>
  )
}
