import { useEffect } from 'react'
import {
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Link,
} from '@chakra-ui/react'
import { BsPlus } from 'react-icons/bs'
import { BiMinus } from 'react-icons/bi'
import NextLink from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'

import navItems from './navItems'
import { auth } from '../../firebase'
import { AuthService } from '../../lib/context'

export default function AccordionSidebar({ onClose }) {
  const [user, loading] = useAuthState(auth)
  const { fetchUserName, username, logout } = AuthService()

  useEffect(() => {
    if (loading) return
    if (user) {
      fetchUserName()
    }
  }, [user, fetchUserName, loading])

  const signOut = () => {
    logout() 
    onClose()
  }

  return (
    <>
      <Accordion allowToggle borderColor='transparent' w='250px'>
        {user && (
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <AccordionButton>
                  <Text textAlign='left' flex='1' fontWeight='bold'>
                    Welcome,&nbsp;{username}
                  </Text>
                  {isExpanded ? (
                    <BiMinus fontSize='16px' />
                  ) : (
                    <BsPlus fontSize='16px' />
                  )}
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack spacing={1} align='start'>
                    <NextLink href='/profile' passHref>
                      <Link onClick={onClose}>Profile</Link>
                    </NextLink>
                    <Text onClick={signOut}>Logout</Text>
                  </VStack>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        )}
        {navItems.movies.map((item, index) => (
          <AccordionItem key={index}>
            {({ isExpanded }) => (
              <>
                <AccordionButton>
                  <Text textAlign='left' flex='1' fontWeight='bold'>
                    {item.name}
                  </Text>
                  {isExpanded ? (
                    <BiMinus fontSize='16px' />
                  ) : (
                    <BsPlus fontSize='16px' />
                  )}
                </AccordionButton>
                <AccordionPanel pb={4}>
                  {item.href.map((it, index) => (
                    <VStack spacing={1} align='start' key={index}>
                      <NextLink href={`/movie/${it.linkA}`} passHref>
                        <Link onClick={onClose}>{it.labelA}</Link>
                      </NextLink>
                      <NextLink href={`/movie/${it.linkB}`} passHref>
                        <Link onClick={onClose}>{it.labelB}</Link>
                      </NextLink>
                    </VStack>
                  ))}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
        {navItems.shows.map((item, index) => (
          <AccordionItem key={index}>
            {({ isExpanded }) => (
              <>
                <AccordionButton>
                  <Text textAlign='left' flex='1' fontWeight='bold'>
                    {item.name}
                  </Text>
                  {isExpanded ? (
                    <BiMinus fontSize='16px' />
                  ) : (
                    <BsPlus fontSize='16px' />
                  )}
                </AccordionButton>
                <AccordionPanel pb={4}>
                  {item.href.map((it, index) => (
                    <VStack spacing={1} align='start' key={index}>
                      <NextLink href={`/tv/${it.linkA}`} passHref>
                        <Text onClick={onClose}>{it.labelA}</Text>
                      </NextLink>
                      <NextLink href={`/tv/${it.linkB}`}>
                        <Text onClick={onClose}>{it.labelB}</Text>
                      </NextLink>
                    </VStack>
                  ))}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
        {navItems.people.map((item, index) => (
          <AccordionItem key={index}>
            {({ isExpanded }) => (
              <>
                <AccordionButton>
                  <Text textAlign='left' flex='1' fontWeight='bold'>
                    {item.name}
                  </Text>
                  {isExpanded ? (
                    <BiMinus fontSize='16px' />
                  ) : (
                    <BsPlus fontSize='16px' />
                  )}
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack spacing={1} align='start'>
                    <NextLink href={`/person/${item.href}`} passHref>
                      <Link onClick={onClose}>{item.label}</Link>
                    </NextLink>
                  </VStack>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}
