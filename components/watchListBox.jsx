import { Box, Img, Text, VStack, Flex, Icon } from '@chakra-ui/react'
import Link from 'next/link'
import {MdDeleteOutline} from 'react-icons/md'

export default function WatchListBox({item, deleteShow}) {
     
  return (
    <Flex
      gap={2}
      rounded='xl'
      w={{ base: '90vw' }}
      shadow='lg'
      mb={4}
      h='180px'
      align='center'
    >
      <>
        {item.title ? (
          <Link href={`/details/movie/${item.id}`} cursor='pointer' passHref>
            <Box w='130px' h='175px'>
              <Img
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
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
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.name}
                boxSize='100%'
                rounded='lg'
                title={item?.name}
              />
            </Box>
          </Link>
        )}
      </>
      <VStack spacing={2} align='start' p={2} w='75vw'>
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
          <Text>{item?.premier?.slice(0, 4)}</Text>
        </Box>

        <Text fontSize='sm' display={{ base: 'none', md: 'block' }}>{`${
          item?.overview?.slice(0, 300) + '...'
        }`}</Text>

        <Text fontSize='sm' display={{ base: 'block', md: 'none' }}>{`${
          item?.overview?.slice(0, 60) + '...'
        }`}</Text>
        <Flex
          gap={2}
          onClick={() => deleteShow(item.id)}
          align='center'
          cursor='pointer'
        >
          <Icon
            as={MdDeleteOutline}
            fontSize='30px'
            _hover={{ color: 'blue.200' }}
          />
          <Text>Remove</Text>
        </Flex>
      </VStack>
    </Flex>
  )
}
