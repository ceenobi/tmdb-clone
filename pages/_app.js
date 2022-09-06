import { ChakraProvider } from '@chakra-ui/react'
import NProgress from 'nprogress'
import Router from 'next/router'

import { Layout, ErrorBoundary } from '../components'
import theme from '../styles/customTheme'
import { AuthContextProvider } from '../lib/context'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  NProgress.configure({ showSpinner: false })
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })

  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })

  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary FallbackComponent={<h2>There was an error</h2>}>
        <AuthContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContextProvider>
      </ErrorBoundary>
    </ChakraProvider>
  )
}

export default MyApp



