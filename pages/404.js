import { Box, Flex, Container, Heading, Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function Custom404() {
  return (
    <Box mt='5rem' py={6}>
      <Container maxW='container.lg'>
        <Flex justify='center' align='center' direction='column'>
          <Heading as='h2' size='md' mb='2rem'>
            oops! - Page Not Found
          </Heading>
          <Link href='/'>
            <Button variant='outline' size='lg'>GO HOME</Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}
