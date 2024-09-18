import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Divider, Heading, HStack, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, SimpleGrid, Skeleton, Stack, Text, useToast } from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons";
import ProductCards from '../components/ProductCards';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux-Toolkit/features/authentication/authSlice';


const Milk = () => {

  // Chakra Hooks
  const toast = useToast();

  // React-router-dom hooks
  const navigate = useNavigate();

  // React-redux hooks
  const dispatch = useDispatch();

  // React hooks
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filterValue,setFilterValue] = useState("");
  const [sortingValue,setSortingValue] = useState("");

  const baseUrl = import.meta.env.VITE_API_URL;

  // Fetching product Data 
  const fetchProduct = async (filterValue,sortingValue) => {
    setIsLoading(true)
    try {
      const queryParams = {};

      if(filterValue){
        queryParams.brandName = filterValue;
      }
      
            if(sortingValue == "priceLH"){
              queryParams.sort = "price",
              queryParams.order = "asc"
            }
      
            if(sortingValue == "priceHL"){
              queryParams.sort = "price",
              queryParams.order = "desc"
            }
      
            if(sortingValue == "discountLH"){
              queryParams.sort = "discountBadge",
              queryParams.order = "asc"
            }
      
            if(sortingValue == "discountHL"){
              queryParams.sort = "discountBadge",
              queryParams.order = "desc"
            }
      
      const res = await axios.get(`${baseUrl}/products/allProducts?category=Dairy`, {
        params:queryParams
      });
      // console.log("product",res)
      // console.log(res.data)
      setTotalProduct(res?.data?.totalProduct)
      setProducts(res?.data?.data)
      setIsLoading(false)
    }
    catch (error) {
      setError(error)
      setIsLoading(false);
      if (error?.response?.status === 401) {
        dispatch(logout());
        navigate("/login")
      }
    }

  }


  // Use Effect for handling sideEffect
  useEffect(() => {
    fetchProduct(filterValue,sortingValue);
  }, [filterValue,sortingValue]);

  // Filter menu function
  const handleFiltering =(e)=>{
    setFilterValue(e);
  };

  // Sorting menu function
  const handleSorting = (e)=>{
    setSortingValue(e);
  }

  // Loading Component
  if (isLoading) {
    return <Stack>
      <Skeleton height="100px" w="80%" m="auto"></Skeleton>
      <Skeleton height="400px" w="80%" m="auto"></Skeleton>
      <Skeleton height="200px" w="80%" m="auto"></Skeleton>
      <Skeleton height="100px" w="80%" m="auto"></Skeleton>
    </Stack>
  }

  // Error Component
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
            <Menu gutter={0}>
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
              <MenuList borderRadius="0px">
                <MenuOptionGroup onChange={handleFiltering} title='Filter' type='radio'>
                  {/* <MenuItemOption value='fresho!'>fresho!</MenuItemOption> */}
                  <MenuItemOption value='Nandini'>Nandini</MenuItemOption>
                  <MenuItemOption value='Heritage'>Heritage</MenuItemOption>
                  <MenuItemOption value='Nestle A+'>Nestle A+</MenuItemOption>
                  <MenuItemOption value='Sri Sri Tattva'>Sri Sri Tattva</MenuItemOption>
                  <MenuItemOption value='bb Popular'>bb Popular</MenuItemOption>
                  <MenuItemOption value='Amul'>Amul</MenuItemOption>
                  <MenuItemOption value='Gowardhan'>Gowardhan</MenuItemOption>
                  <MenuItemOption value='So Good'>So Good</MenuItemOption>
                  <MenuItemOption value='AKSHAYAKALPA'>AKSHAYAKALPA</MenuItemOption>
                  <MenuItemOption value='Milky Mist'>Milky Mist</MenuItemOption>
                  <MenuItemOption value='Go'>Go</MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>

            {/* Sorting Menu */}
            <Menu gutter={0}>
              <MenuButton as={Button} rightIcon={<AddIcon />}
                variant="outline"
                borderRadius="none"
                borderColor="black"
                colorScheme="none"
              >
                Sort by
              </MenuButton>
              <MenuList borderRadius="0px">
                <MenuOptionGroup onChange={handleSorting} title='Sort by' type='radio'>
                  {/* <MenuItemOption value=''>Sort by</MenuItemOption> */}
                  <MenuItemOption value='priceLH'>Price, low to high</MenuItemOption>
                  <MenuItemOption value='priceHL'>Price, high to low</MenuItemOption>
                  <MenuItemOption value='discountLH'>% OFF, low to high</MenuItemOption>
                  <MenuItemOption value='discountHL'>% OFF, high to low</MenuItemOption>
                </MenuOptionGroup>
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
          {products.map((product) => <ProductCards
            key={product._id}
            productId={product._id}
            imageUrl={product.imageUrl}
            discountBadge={product.discountBadge}
            brandName={product.brandName}
            productName={product.productName}
            size={product.size}
            rating={product.rating}
            price={product.price}
            strikedPrice={product.strikedPrice} />)}
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default Milk


