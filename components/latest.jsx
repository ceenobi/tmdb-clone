import { useState, useEffect } from 'react'
import { Box, Heading, Flex, Stack, Button } from '@chakra-ui/react'
import { PosterBox } from '../components'

export default function Latest({ upcoming, onAir }) {
  const [activeBtn, setActiveBtn] = useState(true)
  useEffect(() => {
    if (activeBtn) {
      setActiveBtn(true)
    } else {
      setActiveBtn(false)
    }
  }, [activeBtn])

  const isActive = activeBtn

  return (
    <Box maxW='container.xl' m='auto' px={4} mt='2rem'>
      <Flex gap={{ base: '3', md: '4' }} align='center'>
        <Heading as='h2' size={{ base: 'sm', md: 'md' }}>
          Trending
        </Heading>
        <Stack spacing={3} direction='row' align='center'>
          <Button
            fontWeight='bold'
            onClick={() => setActiveBtn(true)}
            colorScheme={isActive ? 'pink' : ''}
            variant={isActive ? 'solid' : 'outline'}
          >
            Movies
          </Button>
          <Button
            onClick={() => setActiveBtn(false)}
            colorScheme={!isActive ? 'pink' : ''}
            variant={!isActive ? 'solid' : 'outline'}
          >
            On Air
          </Button>
        </Stack>
      </Flex>
      <Flex align='center' py={4}>
        <Flex
          overflowX='auto'
          flexWrap='nowrap'
          scroll='smooth'
          scrollbar='hide'
        >
          {activeBtn ? (
            <>
              {upcoming.map((item, id) => (
                <PosterBox item={item} key={id} />
              ))}
            </>
          ) : (
            <>
              {onAir.map((item, id) => (
                <PosterBox item={item} key={id} />
              ))}
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
