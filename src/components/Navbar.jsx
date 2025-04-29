import { Box, Flex, Button, Link } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const isAuthenticated = !!user

  const handleLogin = () => {
    navigate('/login')
  }

  const handleSignup = () => {
    navigate('/signup')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
            Customer Connect
          </Link>
        </Box>
        <Flex alignItems="center" gap={4}>
          {isAuthenticated ? (
            <>
              <Link as={RouterLink} to="/products">
                Products
              </Link>
              {user.userType === 'shop_owner' ? (
                <Link as={RouterLink} to="/dashboard">
                  Dashboard
                </Link>
              ) : (
                <Link as={RouterLink} to="/orders">
                  Orders
                </Link>
              )}
              <Button
                colorScheme="blue"
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                colorScheme="blue"
                variant="outline"
                size="sm"
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={handleSignup}
              >
                Sign Up
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar 