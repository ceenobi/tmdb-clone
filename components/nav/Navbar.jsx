import { useState, useCallback, useRef, useEffect } from 'react'
import NextLink from 'next/link'
import {
  Box,
  HStack,
  Heading,
  useColorModeValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  ScaleFade,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  chakra,
  Link,
  Text,
} from '@chakra-ui/react'
import { RiMenu2Fill, RiArrowDropDownLine, RiCloseLine } from 'react-icons/ri'
import { FiSearch } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AuthService } from '../../lib/context'

import useNavlink from '../../hooks/useNavlink'
import Sidebar from './Sidebar'
import navItems from './navItems'
import { auth } from '../../firebase'

export default function Navbar() {
  const searchRef = useRef(null)
  const [showSide, setShowSide] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [visible, setVisible] = useState(false)
  const [query, setQuery] = useState('')
  const [user, loading] = useAuthState(auth)
  const { fetchUserName, username, logout } = AuthService()
  const [handleNavText] = useNavlink()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (user) {
      fetchUserName()
    }
  }, [user, fetchUserName, loading])

  const closeSearchBox = useCallback(() => {
    if (!visible) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [visible])

  const onChange = useCallback(
    (event) => {
      const query = event.target.value.toLowerCase()
      setQuery(query)
      if (query.length) {
        router.push(`/search?query=${query}`)
      }
    },
    [router]
  )

  const onFocus = () => {
    window.addEventListener('click', onClick)
  }

  const onClick = useCallback(
    (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setQuery('')
        window.removeEventListener('click', onClick)
      }
    },
    [setQuery]
  )
  const menuColor = {
    color: useColorModeValue('blackAlpha.900', '#fff'),
  }
  return (
    <Box
      zIndex={10}
      position='fixed'
      top={0}
      w='full'
      borderBottomColor={useColorModeValue('blue.700', 'blue.600')}
      bg={useColorModeValue('#032541', 'blackAlpha.900')}
      color='whiteAlpha.900'
    >
      <Flex
        maxW='container.xl'
        mx='auto'
        align='center'
        justify='space-between'
        h='16'
        px={4}
        gap={10}
      >
        <Box
          onClick={() => setShowSide(!showSide)}
          display={{ base: 'flex', md: 'none' }}
        >
          {showSide ? (
            <IconButton
              variant='unstyled'
              aria-label='open menu'
              icon={<RiCloseLine />}
              fontSize='2xl'
            />
          ) : (
            <IconButton
              variant='unstyled'
              aria-label='open menu'
              icon={<RiMenu2Fill />}
              fontSize='2xl'
            />
          )}
        </Box>
        <NextLink href='/' passHref>
          <Heading
            size={{ base: 'md', md: 'sm', lg: 'lg' }}
            justify='flex-start'
            cursor='pointer'
          >
            TUBINE DB
          </Heading>
        </NextLink>
        <HStack
          spacing={4}
          display={{ base: 'none', md: 'flex' }}
          mr='2rem'
          flex='1'
        >
          {navItems.movies.map((item, index) => (
            <Menu key={index} isLazy size='md'>
              <MenuButton
                as={Button}
                rightIcon={<RiArrowDropDownLine />}
                variant='unstyled'
              >
                {item.label}
              </MenuButton>
              <MenuList sx={menuColor}>
                {item.href.map((it, index) => (
                  <MenuItem key={index}>
                    <NextLink href={`/movie/${it.linkA}`} passHref>
                      <Link>{it.labelA}</Link>
                    </NextLink>
                    <NextLink href={`/movie/${it.linkB}`} passHref>
                      <Link>{it.labelB}</Link>
                    </NextLink>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          ))}
          {navItems.shows.map((item, index) => (
            <Menu key={index} isLazy size='md'>
              <MenuButton
                as={Button}
                rightIcon={<RiArrowDropDownLine />}
                variant='unstyled'
              >
                {item.label}
              </MenuButton>
              <MenuList sx={menuColor}>
                {item.href.map((it, index) => (
                  <MenuItem key={index}>
                    <NextLink href={`/tv/${it.linkA}`} passHref>
                      <Link>{it.labelA}</Link>
                    </NextLink>
                    <NextLink href={`/tv/${it.linkB}`} passHref>
                      <Link>{it.labelB}</Link>
                    </NextLink>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          ))}
          {navItems.people.map((item, index) => (
            <Menu key={index} isLazy size='md'>
              <MenuButton
                as={Button}
                rightIcon={<RiArrowDropDownLine />}
                variant='unstyled'
              >
                {item.name}
              </MenuButton>
              <MenuList sx={menuColor}>
                <MenuItem>
                  <NextLink href={`/person/${item.href}`} passHref>
                    <Link>{item.label}</Link>
                  </NextLink>
                </MenuItem>
              </MenuList>
            </Menu>
          ))}
        </HStack>
        <HStack
          spacing={4}
          justify='flex-end'
          display={{ base: 'none', md: 'flex' }}
        >
          {!user && (
            <Box as={handleNavText} name='Join Tubine' href='/getstarted' />
          )}
          {user && (
            <Menu isLazy size='md'>
              <MenuButton
                as={Button}
                rightIcon={<RiArrowDropDownLine />}
                variant='unstyled'
              >
                Welcome,&nbsp;{username}
              </MenuButton>
              <MenuList sx={menuColor}>
                <MenuItem>
                  <NextLink href={`/profile`} passHref>
                    <Link>Profile</Link>
                  </NextLink>
                </MenuItem>
                <MenuItem>
                  <Text onClick={logout}>Logout</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
        <Box onClick={() => setShowSearch(!showSearch)}>
          {showSearch ? (
            <IconButton
              variant='unstyled'
              aria-label='open menu'
              icon={<RiCloseLine />}
              fontSize='xl'
              onClick={closeSearchBox}
            />
          ) : (
            <IconButton
              icon={<FiSearch />}
              fontSize='xl'
              cursor='pointer'
              aria-label='Search-button'
              variant='unstyled'
              color='teal.200'
              onClick={closeSearchBox}
            />
          )}
        </Box>
      </Flex>
      {showSide && <Sidebar showSide={showSide} setShowSide={setShowSide} />}
      {visible && (
        <ScaleFade initialScale={0.9} in='true'>
          <chakra.form ref={searchRef}>
            <Box w='full' bg='white' border='1px'>
              <InputGroup mx='auto' maxW='container.xl' px={2}>
                <InputLeftElement pl={{ base: '2rem', md: '3rem' }}>
                  <IconButton
                    icon={<FiSearch />}
                    fontSize='15px'
                    aria-label='Search database'
                    variant='unstyled'
                    color='blackAlpha.900'
                    cursor='pointer'
                    type='submit'
                  />
                </InputLeftElement>
                <Input
                  placeholder='Search movies and tv'
                  _placeholder={{ color: 'blackAlpha.700' }}
                  variant='unstyled'
                  py='.5rem'
                  type='text'
                  pl={{ base: '3rem', md: '5rem' }}
                  rounded='none'
                  value={query}
                  onChange={onChange}
                  onFocus={onFocus}
                  color='black'
                />
              </InputGroup>
            </Box>
          </chakra.form>
        </ScaleFade>
      )}
    </Box>
  )
}
