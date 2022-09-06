import { useState } from 'react'
import { Box, Text, VStack, Flex, Icon, Divider } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
import { TbDotsCircleHorizontal } from 'react-icons/tb'
import { useAuthState } from 'react-firebase-hooks/auth'

import { AuthService } from '../lib/context'
import { useToastHook } from '../hooks/useToast'

export default function PosterBox({ item }) {
  const [reveal, setReveal] = useState(false)
  const [like, setLike] = useState(false)
  const [saved, setSaved] = useState(false)
  const { db, arrayUnion, updateDoc, auth, doc } = AuthService()
  const [user] = useAuthState(auth)
  const movieID = doc(db, 'users', `${user?.email}`)
  const [handleToast] = useToastHook()

  const rating = (item.vote_average / 10).toLocaleString('en', {
    style: 'percent',
  })

  const close = () => {
    if (!reveal) {
      setReveal(true)
    } else {
      setReveal(false)
    }
  }

  //const options = [{ name: 'Add to watchlist' }, { name: 'Like' }]

  const savedShow = async () => {
    if (user?.email) {
      setLike(!like)
      setSaved(true)
      await updateDoc(movieID, {
        savedTitles: arrayUnion({
          id: item.id,
          title: item.title || item.name,
          img: item.poster_path,
          premier: item.release_date || item.first_air_date,
          overview: item.overview,
        }),
      })
    } else {
      handleToast({
        message: 'Please login to save a show',
        status: 'warning',
      })
    }
  }

  return (
    <Box mr='20px' flex='0 0 auto' w='160px'>
      <Box pos='relative' cursor='pointer' m='20px auto' align='center'>
        {item.title ? (
          <Link href={`/details/movie/${item.id}`} passHref>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
              alt={item?.title}
              width='160px'
              height='220px'
              blurDataURL='URL'
              placeholder='blur'
              style={{ borderRadius: '10px' }}
              title={item?.title}
            />
          </Link>
        ) : (
          <Link href={`/details/tv/${item.id}`}>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
              alt={item?.name}
              width='160px'
              height='220px'
              blurDataURL='URL'
              placeholder='blur'
              style={{ borderRadius: '10px' }}
              title={item?.name}
            />
          </Link>
        )}

        <Icon
          as={TbDotsCircleHorizontal}
          color='#fff'
          fontSize='25px'
          pos='absolute'
          top='20px'
          right='20px'
          onClick={close}
          role='group'
          _hover={{
            color: '#4267B2',
          }}
        />
        {reveal && (
          <VStack
            spacing={1}
            p={3}
            pos='absolute'
            top='50px'
            right='5px'
            bg='whiteAlpha.800'
            rounded='md'
            fontSize='sm'
            zIndex={4}
          >
            <Text
              _hover={{
                bg: '#032541',
                color: '#fff',
              }}
              w='full'
              mb={0}
              onClick={savedShow}
              color='blackAlpha.900'
            >
              {like ? 'Saved' : 'Add to watchlist'}
            </Text>
            <Divider border='1px' variant='solid' borderColor='blue.700' />
          </VStack>
        )}

        <Flex
          rounded='full'
          bg='black'
          p={2}
          pos='absolute'
          bottom='-15px'
          left='15px'
          boxSize='40px'
          align='center'
          justify='center'
        >
          <Text color='white' fontWeight='bold' fontSize='sm'>
            {rating}
          </Text>
        </Flex>
      </Box>
      <Flex flexWrap='wrap' direction='column'>
        {item.title ? (
          <Link href={`/details/movie/${item.id}`}>
            <Text
              fontWeight='bold'
              cursor='pointer'
              _hover={{ color: 'blue.200' }}
            >
              {item?.title}
            </Text>
          </Link>
        ) : (
          <Link href={`/details/tv/${item.id}`}>
            <Text
              fontWeight='bold'
              cursor='pointer'
              _hover={{ color: 'blue.200' }}
            >
              {item?.name}
            </Text>
          </Link>
        )}
        <Text>{item?.release_date || item?.first_air_date}</Text>
      </Flex>
    </Box>
  )
}
