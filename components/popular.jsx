import { useState, useEffect } from 'react'
import { Box, Heading, Flex, Stack, Button, HStack } from '@chakra-ui/react'
import { PosterBox } from '../components'

export default function Popular({ trending, trendShow }) {
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
    <Box maxW='container.xl' m='auto' px={{ base: '4', md: '10' }} mt='2rem'>
      <Flex gap='3rem' align='center'>
        <Heading as='h2' size={{ base: 'sm', md: 'md' }}>
          {"What's"} Popular
        </Heading>
        <Stack spacing='15px' direction='row' align='center'>
          <Button
            fontWeight='bold'
            onClick={() => setActiveBtn(true)}
            colorScheme={isActive ? 'pink' : ''}
            variant={isActive ? 'solid' : 'outline'}
          >
            Streaming
          </Button>
          <Button
            onClick={() => setActiveBtn(false)}
            colorScheme={!isActive ? 'pink' : ''}
            variant={!isActive ? 'solid' : 'outline'}
          >
            On Tv
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
              {trending?.slice(0, 19).map((item, index) => (
                <PosterBox item={item} key={index} />
              ))}
            </>
          ) : (
            <>
              {trendShow?.slice(0, 19).map((item, index) => (
                <PosterBox item={item} key={index} />
              ))}
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
