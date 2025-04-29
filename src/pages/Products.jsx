import { useState } from 'react'
import {
  Box,
  Container,
  SimpleGrid,
  Input,
  Button,
  Text,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Flex,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/toast'
import '../styles/advanced.css'

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState([])
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Mock products data - replace with API call
  const products = [
    { id: 1, name: 'Product 1', price: 10.99, available: true },
    { id: 2, name: 'Product 2', price: 15.99, available: true },
    { id: 3, name: 'Product 3', price: 20.99, available: false },
  ]

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addToCart = (product) => {
    if (!product.available) {
      toast({
        title: 'Product unavailable',
        description: 'This product is currently out of stock',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    // Check if product is already in cart
    if (cart.some((item) => item.id === product.id)) {
      toast({
        title: 'Product already in list',
        description: 'This product is already in your list',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setCart((prev) => [...prev, product])
    toast({
      title: 'Added to list',
      description: `${product.name} has been added to your list`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
    toast({
      title: 'Removed from list',
      description: 'Item has been removed from your list',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleSubmitList = () => {
    // TODO: Implement list submission logic
    toast({
      title: 'List submitted',
      description: 'Your list has been submitted to the shop owner',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    setCart([])
    onClose()
  }

  return (
    <Container maxW="container.xl" py={8} className="parallax">
      <Box mb={8} className="glass-effect" p={6} borderRadius="lg">
        <Heading mb={4} className="gradient-text">Products</Heading>
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mb={4}
          className="hover-scale"
        />
        <Flex justify="space-between" align="center" mb={4}>
          <Text className="neon-glow">Items in your list: {cart.length}</Text>
          <Button
            colorScheme="blue"
            isDisabled={cart.length === 0}
            onClick={onOpen}
            className="btn-3d pulse"
          >
            Review & Submit List
          </Button>
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredProducts.map((product) => (
          <Card key={product.id} className="card-3d">
            <CardBody>
              <Heading size="md" className="gradient-text">{product.name}</Heading>
              <Text mt={2} className="neon-glow">${product.price}</Text>
              <Badge
                colorScheme={product.available ? 'green' : 'red'}
                mt={2}
                className="floating"
              >
                {product.available ? 'Available' : 'Out of Stock'}
              </Badge>
            </CardBody>
            <CardFooter>
              <Button
                colorScheme="blue"
                width="full"
                onClick={() => addToCart(product)}
                isDisabled={!product.available}
                className="btn-3d hover-scale"
              >
                Add to List
              </Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="glass-effect">
          <ModalHeader className="gradient-text">Review Your List</ModalHeader>
          <ModalCloseButton className="btn-3d" />
          <ModalBody>
            {cart.map((item) => (
              <Flex
                key={item.id}
                justify="space-between"
                align="center"
                mb={2}
                className="hover-scale"
              >
                <Text className="neon-glow">{item.name}</Text>
                <Flex align="center" gap={4}>
                  <Text className="neon-glow">${item.price}</Text>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => removeFromCart(item.id)}
                    className="btn-3d"
                  >
                    Remove
                  </Button>
                </Flex>
              </Flex>
            ))}
            {cart.length === 0 && (
              <Text className="gradient-text">Your list is empty</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose} className="btn-3d">
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmitList}
              isDisabled={cart.length === 0}
              className="btn-3d pulse"
            >
              Submit List
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default Products 