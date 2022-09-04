import React from 'react'
import Link from 'next/link'

export default function useNavlink() {
  const handleNavText = ({ href, name, onClick, ...rest }) => {
    return (
      <Link
        href={href}
        fontSize={['sm', 'md', 'lg']}
        {...rest}
        _hover={{ color: '#4267B2' }}
        className={(navData) =>
          navData.isActive && location.pathname !== '/' ? 'red.400' : ''
        }
        passHref
        onClick={onClick}
      >
        {name}
      </Link>
    )
  }
  return [handleNavText]
}
