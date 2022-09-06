import React, { useState, useId, useEffect } from 'react'
import {
  chakra,
  Text,
  Heading,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
} from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import registerOptions from '../lib/inputValidation'
import { AuthService } from '../lib/context'
import Loader from '../lib/loader'
import { auth } from '../firebase'
import {Layout} from '../components'

export default function GetStarted() {
  const [isSignup, setIsSignup] = useState(false)
  const ID = useId()
  const [user, loading] = useAuthState(auth)
  const {
    registerWithEmailAndPassword,
    logInWithEmailAndPassword,
    isSubmitting,
  } = AuthService()
  const router = useRouter()

  useEffect(() => {
    if (loading) {
      <Loader />
    }
    if (user) router.push('/')
  }, [user, loading, router])

  const methods = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods

  const handleError = (errors) => {}

  const onSubmit = (data) => {
    if (isSignup) {
      registerWithEmailAndPassword(data.username, data.email, data.password)
    } else {
      logInWithEmailAndPassword(data.email, data.password)
    }
  }

  const switchMode = () => {
    setIsSignup((previsSignup) => !previsSignup)
  }

  return (
    <>
      <Head>
        <title>Join Tubine</title>
        <meta name='description' content='User Register or Login page' />
      </Head>
        <Box maxW='container.xl' mx='auto' py='2rem'>
          <Box
            align='center'
            maxW='450px'
            h={{ base: '600px', md: '400px' }}
            mx='auto'
          >
            <Heading fontSize='lg' align='center'>
              {isSignup ? 'Sign up' : 'Sign in'}
            </Heading>

            <FormProvider {...methods}>{/* errors */}</FormProvider>
            <chakra.form
              maxW={{ base: '270px', sm: '320px' }}
              py={10}
              mx='auto'
              textAlign='start'
              onSubmit={handleSubmit(onSubmit, handleError)}
            >
              <Stack spacing={4} mb={10}>
                {isSignup && (
                  <FormControl id={`${ID}-username`}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      name='username'
                      type='text'
                      {...register('username', registerOptions.username)}
                    />
                    {errors?.username && (
                      <Box as='span' color='red.400'>
                        {errors.username.message}
                      </Box>
                    )}
                  </FormControl>
                )}
                <FormControl id={`${ID}-email`}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name='email'
                    placeholder='email@example.com'
                    type='email'
                    {...register('email', registerOptions.email)}
                  />
                  {errors?.email && (
                    <Box as='span' color='red.400'>
                      {errors.email.message}
                    </Box>
                  )}
                </FormControl>
                <FormControl id={`${ID}-password`}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    name='password'
                    type='password'
                    placeholder='password'
                    required
                    {...register('password', registerOptions.password)}
                  />
                  {errors?.password && (
                    <Box as='span' color='red.400'>
                      {errors.password.message}
                    </Box>
                  )}
                  <NextLink href='/forgotpassword' passHref>
                    <Link fontSize='sm'>forgot password?</Link>
                  </NextLink>
                </FormControl>
              </Stack>
              <Button
                type='submit'
                bg='paint.blue'
                color='whiteAlpha.900'
                size='lg'
                w='full'
                isLoading={isSubmitting}
                mb={3}
                _hover={{ bg: 'blue.800' }}
              >
                {isSignup ? 'Sign up' : 'Sign in'}
              </Button>
              <Box onClick={switchMode}>
                {isSignup ? (
                  <Text>
                    New to Mobie Tv? &nbsp;
                    <Box as='span' cursor='pointer' textDecoration='underline'>
                      Sign in now
                    </Box>
                  </Text>
                ) : (
                  <Text>
                    New to Tubine? &nbsp;
                    <Box as='span' cursor='pointer' textDecoration='underline'>
                      Sign up now
                    </Box>
                  </Text>
                )}
              </Box>
            </chakra.form>
          </Box>
        </Box>
    </>
  )
}

GetStarted.Layout = Layout