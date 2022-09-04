import {useState, useEffect} from 'react'

export function useSearchDebounce(delay = 500) {
  const [query, setQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const delayFn = setTimeout(() => setQuery(searchQuery), delay)
    return () => clearTimeout(delayFn)
  }, [searchQuery, delay])

  return [query, setSearchQuery]
}
