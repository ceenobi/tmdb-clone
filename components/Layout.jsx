import Head from 'next/head'
import { Box, ScaleFade } from '@chakra-ui/react'
import Navbar from './nav/Navbar'
import Footer from './footer'

export default function Layout({ title, description, children }) {
  return (
    <>
      <Head>
        <title>{title ? `${title}` : 'Tubine DB'}</title>
        {description && <meta name='description' content={description}></meta>}
      </Head>
      <header>
        <Navbar />
      </header>
      <ScaleFade initialScale={0.9} in='true'>
        <Box mt='4rem' className='viewBox'>
          <main>{children}</main>
        </Box>
      </ScaleFade>
      <footer>
        <Footer />
      </footer>
    </>
  )
}
