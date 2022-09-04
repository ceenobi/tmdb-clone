import Head from 'next/head'
import { Hero, Layout, Popular, Latest, WatchProviders } from '../components'
import {
  getPopularMovie,
  getTrendingMovie,
  getUpcomingMovie,
  getTrendingTv,
  getOnAirTv,
  getWatchProvider,
} from './api/tubine.server'

export default function Index({
  backdrop,
  trending,
  trendingShow,
  upcoming,
  onAir,
  watch
}) {
  return (
    <>
      <Head>
        <title>Tubine DB</title>
        <meta name='description' content='Landpage view' />
      </Head>
      <Hero backdrop={backdrop} />
      <Popular trending={trending} trendShow={trendingShow} />
      <Latest upcoming={upcoming} onAir={onAir} />
      <WatchProviders watch={watch} />
    </>
  )
}

Index.Layout = Layout

export async function getServerSideProps() {
  const backdrop = await getPopularMovie()
  const upcoming = await getUpcomingMovie()
  const onAir = await getOnAirTv()
  const watch = await getWatchProvider()
  const trending = await getTrendingMovie()
  const trendingShow = await getTrendingTv()

  return {
    props: {
      backdrop: backdrop.results,
      trending,
      trendingShow,
      upcoming,
      onAir,
      watch
    },
  }
}
