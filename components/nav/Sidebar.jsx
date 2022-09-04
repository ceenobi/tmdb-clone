import { Box, Flex, ScaleFade, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'

import { AccordionSidebar } from '../../components'

export default function Sidebar({ showSide, setShowSide }) {
  const navigateToPath = () => setShowSide(!showSide)

  const outerBoxStyles = {
    background: '#064763',
    border: '1px solid rgba(255,255,255,0.18)',
    backdropFilter: 'auto',
    backdropBlur: '2xl',
  }
  return (
    <>
      <Box
        w={{ base: '90%', md: '320px' }}
        pos='fixed'
        top='0%'
        mt='4rem'
        left={0}
        h='full'
        display={{ base: 'flex', md: 'none' }}
        sx={outerBoxStyles}
        zIndex={3}
      >
        <ScaleFade initialScale={0.9} in='true'>
          <Flex h='full' alignItems='center' direction='column' mt={4}>
            <AccordionSidebar onClose={navigateToPath} />
            <VStack
              spacing={3}
              mt='2rem'
              mr='auto'
              px={3}
              fontWeight='bold'
              align='left'
            >
              <Link href='/getstarted'>
                <Text onClick={() => setShowSide(!showSide)}>Join Tubine</Text>
              </Link>
            </VStack>
          </Flex>
        </ScaleFade>
      </Box>
    </>
  )
}
