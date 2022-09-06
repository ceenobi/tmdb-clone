import { Box, Heading, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'

export default function WatchProviders({ watch }) {
  return (
    <Box maxW='container.xl' m='auto' px={4} mt='2rem'>
      <Flex gap={{ base: '3', md: '4' }} align='center'>
        <Heading as='h2' size={{ base: 'sm', md: 'md' }}>
          Watch on your services
        </Heading>
      </Flex>
      <Flex align='center' py={4} flexWrap='wrap'>
        {watch.slice(0, 8).map((item, i) => (
          <Box mb={4} key={i} mr={{ base: '1.2rem', md: '1.5rem' }}>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${item?.logo_path}`}
              width='100px'
              height='100px'
              blurDataURL='URL'
              placeholder='blur'
              alt={item?.title || item?.name}
            />
            <Text w='100px'>{item.provider_name}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}
