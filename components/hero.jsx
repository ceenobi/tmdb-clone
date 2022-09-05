import { Box, Heading, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'

export default function Hero({ backdrop }) {
  const movie = backdrop[Math.floor(Math.random() * backdrop.length)]

  return (
    <Box maxW={{ base: 'none', md: 'container.xl' }} mx='auto'>
      <Box w='full' h='400px'>
        <Box pos='relative'>
          <Box
            pos='absolute'
            w='full'
            h='400px'
            top='0%'
            zIndex={2}
            bgGradient='linear(to-r, rgba(0, 0 ,0 ,1.7), rgba(0, 0 ,0 ,0.2))'
            opacity='1'
          />
          <Box w='full' h='400px' pos='relative'>
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              alt='imagecover'
              layout='fill'
              blurDataURL='URL'
              placeholder='blur'
            />
          </Box>

          <Flex
            justify='flex-start'
            align='center'
            gap={8}
            h='300px'
            pos='absolute'
            top={['10%', '20%']}
            px={{ base: '4', md: '10' }}
            zIndex={4}
          >
            <Box textAlign='start' color='whiteAlpha.900'>
              <Heading as='h2' size='2xl' lineHeight='tall'>
                Welcome
              </Heading>
              <Text letterSpacing='wider' fontWeight='bold'>
                Millions of movies, Tv shows, and people to discover. Explore
                now.
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
