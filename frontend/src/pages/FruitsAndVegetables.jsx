import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Divider, Heading, HStack, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Skeleton, Stack, Text } from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons";
import ProductCards from '../components/ProductCards';
import { useEffect, useState } from 'react';
import axios from 'axios';


const FruitsAndVegetables = () => {
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchProduct = async (token) => {
    setIsLoading(true)
    try {
      const res = await axios.get(`${baseUrl}/products/allProducts?category=Fruits%20%26%20Vegetables`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      console.log(res.data)
      setTotalProduct(res.data.totalProduct)
      setProducts(res?.data?.data)
      setIsLoading(false)
    } catch (error) {
      setError(error)
      setIsLoading(false);
    }

  }

  useEffect(() => {
    const { accessToken } = JSON.parse(localStorage.getItem("user"));
    fetchProduct(accessToken)
  }, [])

  if (isLoading) {
    return <Stack>
      <Skeleton height="100px" w="80%" m="auto"></Skeleton>
      <Skeleton height="400px" w="80%" m="auto"></Skeleton>
      <Skeleton height="200px" w="80%" m="auto"></Skeleton>
      <Skeleton height="100px" w="80%" m="auto"></Skeleton>
    </Stack>
  }
  if (error) {
    return <Alert
      status='error'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='100vh'
    >
      <AlertIcon boxSize='100px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='3xl'>
        Request Failed
      </AlertTitle>
      <AlertDescription maxWidth='sm' fontSize="xl" mt={4}>
        There was an error processing your request
      </AlertDescription>
    </Alert>
  }

  
  return (
    <Box w="80%" m="auto">
      <Heading fontSize={24} textAlign="center">Fruits & Vegetables Page</Heading>
      <Box m="20px 0">
        <HStack justify="space-between">
          <Box>

            {/* Filter Menu */}
            <Menu>
              <MenuButton as={Button} rightIcon={<AddIcon />}
                variant="outline"
                borderRadius="none"
                borderColor="black"
                colorScheme="none"
                color="white"
                bgColor="black"
              >
                Filter by brands
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>

            {/* Sorting Menu */}
            <Menu>
              <MenuButton as={Button} rightIcon={<AddIcon />}
                variant="outline"
                borderRadius="none"
                borderColor="black"
                colorScheme="none"
              >
                Sort by
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>

          </Box>
          <Box>
            <Text fontWeight="bold">Products({totalProduct})</Text>
          </Box>
        </HStack>
      </Box>

      <Divider borderColor="gray" borderStyle="dashed" />

      <Box m="10px 0">
        <SimpleGrid columns={4} spacing={5}>
        {products.map((product)=><ProductCards key={product._id} />)}
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default FruitsAndVegetables
