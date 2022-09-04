import { Box, Flex, Button, HStack } from '@chakra-ui/react'

export default function PaginatedItems({
  currentPage,
  setCurrentPage,
  totalPosts,
  postPerPage,
}) {
  const totalPages = Math.ceil(totalPosts / postPerPage)

  let pages = []

  for (let p = 1; p <= totalPages; p++) {
    pages.push(p)
  }

  return (
    <Flex justifyContent='flex-start'>
      <HStack spacing='12px'>
        <Box className={`page-item ${currentPage === 1 && `disabled`}`}>
          <Button
            size='sm'
            className='page-link'
            variant='unstyled'
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &laquo;
          </Button>
        </Box>
        {pages.map((page) => (
          <Box
            key={page}
            className={`page-item ${page === currentPage && `active`}`}
            onClick={() => setCurrentPage(page)}
          >
            <Button size='sm' variant='unstyled' className='page-link'>
              {page}
            </Button>
          </Box>
        ))}
        <Box
          className={`page-item ${currentPage === totalPages && `disabled`}`}
        >
          <Button
            size='sm'
            variant='unstyled'
            className='page-link'
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            &raquo;
          </Button>
        </Box>
      </HStack>
    </Flex>
  )
}
