import { Box, Container, Flex, Stack, Text, Icon } from '@chakra-ui/react'
import { RiTwitterLine } from 'react-icons/ri'
import { MdLocalMovies } from 'react-icons/md'
import { ColorModeSwitcher } from '../lib/colorModeSwitcher'

export default function Footer() {
  const hoverStyle = {
    _hover: {
      color: 'red.800',
    },
  }
  return (
    <Box bg='blackAlpha.900' py={5} px={1} h='10rem'>
      <Container maxW='container.xl'>
        <Flex
          justify='space-between'
          direction='row'
          textAlign='left'
          flexWrap='wrap'
          color='#fff'
        >
          <Stack
            direction='row'
            spacing={3}
            fontSize='xs'
            mb={4}
            flexWrap='wrap'
            align='center'
          >
            <Text sx={hoverStyle} cursor='pointer'>
              ABOUT
            </Text>
            <Text sx={hoverStyle} cursor='pointer'>
              ACTIVATE
            </Text>
            <Text sx={hoverStyle} cursor='pointer'>
              BLOG
            </Text>
            <Text sx={hoverStyle} cursor='pointer'>
              BRANDING
            </Text>
            <Text sx={hoverStyle} cursor='pointer'>
              API
            </Text>
            <Text sx={hoverStyle} cursor='pointer'>
              HELP
            </Text>
            <Text sx={hoverStyle} cursor='pointer'>
              PRIVACY
            </Text>
          </Stack>
          <Stack direction='row' spacing={3} mb={4} align='center'>
            <Icon
              as={RiTwitterLine}
              fontSize='20px'
              sx={hoverStyle}
              cursor='pointer'
            />
            <Icon
              as={MdLocalMovies}
              fontSize='20px'
              sx={hoverStyle}
              cursor='pointer'
            />
            <ColorModeSwitcher />
          </Stack>
        </Flex>
        <Flex
          gap={2}
          fontSize='xs'
          color='#fff'
          direction={{ base: 'column', md: 'row' }}
        >
          <Text>TUBINE DB</Text>
          <Box>
            <Text>
              © 2010-2022 Tubine, inc. All rights reserved. Not certified.
            </Text>
            <Text>Powered by TMDB.</Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
