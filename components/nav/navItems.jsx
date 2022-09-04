const navItems = {
  movies: [
    {
      name: 'Movies',
      label: 'Movies',
      href: [
        { linkA: 'popular', labelA: 'Popular' },
        { linkB: 'nowplaying', labelB: 'Now playing' },
      ],
    },
  ],
  shows: [
    {
      name: 'Tv Shows',
      label: 'Tv Shows',
      href: [
        { linkA: 'popular', labelA: 'Popular' },
        { linkB: 'toprated', labelB: 'Top Rated' },
      ],
    },
  ],
  people: [
    {
      name: 'People',
      label: 'Popular',
      href: 'popular',
    },
  ],
}

export default navItems
