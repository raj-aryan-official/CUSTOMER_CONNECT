import { Box, Container, Heading, Text, Button, SimpleGrid } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Link as RouterLink } from 'react-router-dom'
import '../styles/advanced.css'

const Feature = ({ title, description }) => {
  return (
    <Box
      p={6}
      rounded="lg"
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow="lg"
      className="card-3d glass-effect"
    >
      <Heading as="h3" size="md" mb={4} className="gradient-text">
        {title}
      </Heading>
      <Text className="neon-glow">{description}</Text>
    </Box>
  )
}

const Home = () => {
  return (
    <Container maxW="container.xl" className="parallax">
      <Box textAlign="center" py={20} className="glass-effect" p={8} borderRadius="lg">
        <Heading as="h1" size="2xl" mb={4} className="gradient-text floating">
          Welcome to Customer Connect
        </Heading>
        <Text fontSize="xl" mb={8} className="neon-glow">
          Streamline your shopping experience with our easy-to-use platform
        </Text>
        <Button
          as={RouterLink}
          to="/signup"
          colorScheme="blue"
          size="lg"
          mb={12}
          className="btn-3d pulse"
        >
          Get Started
        </Button>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={20}>
        <Feature
          title="Easy Ordering"
          description="Submit your product list and let us handle the rest"
        />
        <Feature
          title="Real-time Updates"
          description="Get instant notifications about your order status"
        />
        <Feature
          title="Secure Payment"
          description="Pay securely when you collect your items"
        />
      </SimpleGrid>
    </Container>
  )
}

export default Home 