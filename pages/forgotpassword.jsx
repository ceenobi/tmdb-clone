import React, { useId } from 'react'
import {
  chakra,
  Heading,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import Head from 'next/head'
import { useRouter } from 'next/router'

import registerOptions from '../lib/inputValidation'
import { AuthService } from '../lib/context'

export default function Forgotpassword() {
  const { sendPasswordReset, isSubmitting } = AuthService()
  const ID = useId()
  const router = useRouter()
  const methods = useForm({
    defaultValues: {
      email: '',
    },
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods

  const handleError = (errors) => {}

  const onSubmit = (data) => {
    sendPasswordReset(data.email)
    router.push('/getstarted')
  }

  return (
    <>
      <Head>
        <title>Forgot password</title>
        <meta name='description' content='Password forgot' />
      </Head>
      <Box maxW='container.xl' mx='auto' py='2rem'>
        <Box
          align='center'
          maxW='450px'
          h={{ base: '600px', md: '400px' }}
          mx='auto'
        >
          <Heading fontSize='lg' align='center'>
            Fogot password
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
                Reset
              </Button>
            </Stack>
          </chakra.form>
        </Box>
      </Box>
    </>
  )
}
