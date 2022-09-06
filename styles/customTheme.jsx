import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}

const theme = extendTheme(
  {
    colors: {
      paint: {
        teal: '#4FA3A5',
        blue: '#032541',
        white: '#fff',
      },
    },
    fonts: {
      heading: `'Mismo', sans-serif`,
      body: `'Borzoi', sans-serif`,
    },
    styles: {
      global: (props) => ({
        'html, body': {
          // minH: '100%',
          // margin: '0',
          // display: 'flex',
          // flexDirection: 'column',
          // position: 'relative',
          //   bg: 'blackAlpha.700',
          //   lineHeight: 'tall',
          //   color: 'whiteAlpha.800',
          //color: props.colorMode === 'dark' ? '#fff' : 'blackAlpha.900',
        },
        '::-webkit-scrollbar': {
          width: '0.4px',
          webkitOverflowScrolling: 'touch',
        },
        '.hide-scrollbar': {
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        },
        '.pagination': {
          display: 'flex',
          gap: '20px',
          p: '5px',
          listStyleType: 'none',
        },
        '.active': {
          rounded: 'sm',
          color: props.colorMode === 'dark' ? 'white' : 'black',
          px: '10px',
          border:
            props.colorMode === 'dark' ? '.5px solid white' : '1.5px solid black',
        },
        '.prev .next': {
          borderRadius: '6px',
          marginRight: '10px',
        },
        '.disabled': {
          cursor: 'not-allowed',
          opacity: '0.2',
        },
        '.break-me': {
          px: '10px',
        },
        '.viewBox': {
          minHeight: 'calc(100vh - 10rem)',
        },
        a: {
          textDecoration: 'none',
        },
      }),
    },
  },
  { breakpoints }
)

export default theme
