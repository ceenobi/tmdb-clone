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

export default function Resetpassword() {
  const { resetPassword, isSubmitting } = AuthService()
  const ID = useId()
  const router = useRouter()

  let oob = router.query['oobCode']

  const methods = useForm({
    defaultValues: {
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
    resetPassword(oob, data.password)
    router.push('/getstarted')
  }

  return (
    <>
      <Head>
        <title>Join Tubine</title>
        <meta name='description' content='Reset password' />
      </Head>
      <Box maxW='container.xl' mx='auto' py='2rem'>
        <Box
          align='center'
          maxW='450px'
          h={{ base: '600px', md: '400px' }}
          mx='auto'
        >
          <Heading fontSize='lg' align='center'>
            Reset password
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
                Reset Password
              </Button>
            </Stack>
          </chakra.form>
        </Box>
      </Box>
    </>
  )
}
