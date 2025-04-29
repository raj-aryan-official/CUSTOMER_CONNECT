import { Box, Text, Flex } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/color-mode'

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      p={4}
      mt="auto"
    >
      <Flex justify="center">
        <Text fontSize="sm">
          © {new Date().getFullYear()} Customer Connect. All rights reserved.
        </Text>
      </Flex>
    </Box>
  )
}

export default Footer 