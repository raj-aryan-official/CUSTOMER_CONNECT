import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Box flex="1" p={4}>
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  )
}

export default Layout 