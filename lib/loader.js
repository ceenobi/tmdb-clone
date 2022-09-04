import { Flex, Spinner } from '@chakra-ui/react'

export default function Loader() {
  return (
    <>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='pink'
        color='red'
        size='md'
        label='loading'
      />
    </>
  )
}
