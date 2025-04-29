import { useState } from 'react'
import {
  Box,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Badge,
  Heading,
  useToast,
} from '@chakra-ui/react'

const ShopOwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState(0)
  const toast = useToast()

  // Mock orders data - replace with API call
  const orders = [
    {
      id: 1,
      customerName: 'John Doe',
      items: ['Product 1', 'Product 2'],
      status: 'pending',
      total: 26.98,
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      items: ['Product 3'],
      status: 'confirmed',
      total: 20.99,
    },
  ]

  const handleStatusChange = (orderId, newStatus) => {
    // TODO: Implement status change logic
    toast({
      title: 'Status updated',
      description: `Order #${orderId} status changed to ${newStatus}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'yellow'
      case 'confirmed':
        return 'blue'
      case 'packed':
        return 'purple'
      case 'collected':
        return 'green'
      default:
        return 'gray'
    }
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Shop Owner Dashboard</Heading>
      <Tabs onChange={(index) => setActiveTab(index)}>
        <TabList>
          <Tab>Orders</Tab>
          <Tab>Products</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Order ID</Th>
                  <Th>Customer</Th>
                  <Th>Items</Th>
                  <Th>Total</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order) => (
                  <Tr key={order.id}>
                    <Td>#{order.id}</Td>
                    <Td>{order.customerName}</Td>
                    <Td>{order.items.join(', ')}</Td>
                    <Td>${order.total}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </Td>
                    <Td>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() =>
                          handleStatusChange(order.id, 'confirmed')
                        }
                        isDisabled={order.status !== 'pending'}
                      >
                        Confirm
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>

          <TabPanel>
            <Box>
              <Button colorScheme="blue" mb={4}>
                Add New Product
              </Button>
              {/* Add product management table here */}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default ShopOwnerDashboard 