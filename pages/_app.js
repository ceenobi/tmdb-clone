import { ChakraProvider } from '@chakra-ui/react'
import NProgress from 'nprogress'
import Router from 'next/router'

import { Layout } from '../components'
import theme from '../styles/customTheme'
import { AuthContextProvider } from '../lib/context'

function MyApp({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false })

  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })

  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })

  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
