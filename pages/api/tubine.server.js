import {
  moviesPopularUrl,
  moviesTrendingUrl,
  tvTrendingUrl,
  moviesUpcomingUrl,
  tvOnAirUrl,
  watchProvidersUrl,
  movieDetails,
  tvDetails,
  moviesNowPlaying,
  tvPopularUrl,
  tvTopRatedUrl,
  requestPersonUrl,
  requestPersonId,
  searchUrl,
} from '../../lib/constants'
const key = process.env.NEXT_PUBLIC_TMDB_API_KEY

export async function getPopularMovie(page) {
  const popularMovie = await fetch(
    `${moviesPopularUrl}?api_key=${key}&page=${page}`
  )
  const data = await popularMovie.json()
  return data
}
export async function getTrendingMovie() {
  const trendingMovie = await fetch(`${moviesTrendingUrl}?api_key=${key}`)
  const response = await trendingMovie.json()
  const data = response.results
  return data
}
export async function getTrendingTv() {
  const trendingTv = await fetch(`${tvTrendingUrl}?api_key=${key}`)
  const response = await trendingTv.json()
  const data = response.results
  return data
}
export async function getUpcomingMovie() {
  const upcoming = await fetch(`${moviesUpcomingUrl}?api_key=${key}`)
  const response = await upcoming.json()
  const data = response.results
  return data
}
export async function getOnAirTv() {
  const onAir = await fetch(`${tvOnAirUrl}?api_key=${key}`)
  const response = await onAir.json()
  const data = response.results
  return data
}
export async function getWatchProvider() {
  const watch = await fetch(`${watchProvidersUrl}?api_key=${key}`)
  const response = await watch.json()
  const data = response.results
  return data
}

export async function getMovieDetails(movie_id) {
  const details = await fetch(
    `${movieDetails}/${movie_id}?api_key=${key}&append_to_response=similar,credits,reviews,recommendations,videos&include_video_language=en`
  )
  const data = await details.json()
  return data
}
export async function getTvDetails(tv_id) {
  const details = await fetch(
    `${tvDetails}/${tv_id}?api_key=${key}&append_to_response=similar,credits,reviews,recommendations,videos&include_video_language=en`
  )
  const data = await details.json()
  return data
}

export async function getNowPlayingMovie(page) {
  const playing = await fetch(
    `${moviesNowPlaying}?api_key=${key}&language=en-US&page=${page}`
  )
  const data = await playing.json()
  return data
}
export async function getPopularTv(page) {
  const popularTv = await fetch(
    `${tvPopularUrl}?api_key=${key}&language=en-US&page=${page}`
  )
  const data = await popularTv.json()
  return data
}

export async function getTopRatedTv(page) {
  const ratedTv = await fetch(
    `${tvTopRatedUrl}?api_key=${key}&language=en-US&page=${page}`
  )
  const data = await ratedTv.json()
  return data
}

export async function getPersonUrl(page) {
  const person = await fetch(
    `${requestPersonUrl}?api_key=${key}&page=${page}&include_adult=false`
  )
  const data = await person.json()
  return data
}

export async function getPersonDetails(person_id) {
  const details = await fetch(
    `${requestPersonId}/${person_id}?api_key=${key}&append_to_response=combined_credits,external_ids`
  )
  const data = await details.json()
  return data
}
export async function getSearchDetails(query, page) {
  const search = await fetch(
    `${searchUrl}?api_key=${key}&query=${query}&page=${page}&include_adult=false`
  )
  const data = await search.json()
  return data
}