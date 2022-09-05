import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Box, Heading, Flex, Text } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'

import { AuthService } from '../lib/context'
import { WatchListBox } from '../components'
import { useToastHook } from '../hooks/useToast'
import Loader from '../lib/loader'

export default function Profile() {
  const [handleToast] = useToastHook()
  const { db, updateDoc, auth, watchlist, username, doc } = AuthService()
  const [user, error, loading] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    user ? router.push('/profile') : router.push('/')
  }, [user, router])

  if (error) console.log(error)

  const showRef = doc(db, 'users', `${user?.email}`)

  const deleteShow = async (passedID) => {
    try {
      const res = watchlist?.filter((item) => item.id !== passedID)
      await updateDoc(showRef, {
        savedTitles: res,
      })
    } catch (error) {
      handleToast({
        message: error.message,
        status: 'warning',
      })
    }
  }

  return (
    <>
      <Head>
        <title>{username}</title>
        <meta name='description' content='User profile' />
      </Head>
      <Box>
        <Box w='full' h='200px'>
          <Box pos='relative'>
            <Box
              pos='absolute'
              w='full'
              h='200px'
              top='0%'
              zIndex={2}
              bgGradient='linear(to-r, rgba(0, 0 ,0 ,1.7), rgba(0, 0 ,0 ,0.2))'
              opacity='1'
            />
            <Box w='full' h='200px' pos='relative'>
              <Image
                src='https://r4.wallpaperflare.com/wallpaper/221/189/102/batman-batman-begins-movies-the-dark-knight-wallpaper-e950081d510a1ddba6d7487f80d1363d.jpg'
                alt='imagecover'
                layout='fill'
                blurDataURL='URL'
                placeholder='blur'
              />
            </Box>

            <Flex
              align='center'
              gap={8}
              h='200px'
              pos='absolute'
              top='0'
              left='0'
              px={{ base: '4', md: '10' }}
              zIndex={4}
              w={{ base: 'full', md: '80w' }}
              m='auto'
              justify='flex-start'
            >
              <Flex
                gap={4}
                color='whiteAlpha.900'
                align='center'
                mx='auto'
                direction={{ base: 'column', md: 'row' }}
              >
                <Heading as='h2' size='xl' lineHeight='tall'>
                  {username}
                </Heading>
                <Text>Member since {user?.metadata?.creationTime}</Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Box
          py='2rem'
          maxW='container.xl'
          m='auto'
          px={{ base: '4', md: '10' }}
        >
          <Text fontSize='xl' fontWeight='bold'>
            Your watchlist
          </Text>
          {loading && <Loader />}
          <Flex align='center' py={4}>
            <Box>
              {watchlist?.map((item, index) => (
                <WatchListBox item={item} key={index} deleteShow={deleteShow} />
              ))}
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  )
}
