import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Heading, HStack, Image, Skeleton, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { logout } from '../Redux-Toolkit/features/authentication/authSlice';

const ProductDetail = () => {
  const [addLoadingButton, setAddLoadingButton] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const toast = useToast()

  const addToCart = async () => {
    const baseUrl = import.meta.env.VITE_API_URL;


    setAddLoadingButton(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user"))
      const res = await axios.post(`${baseUrl}/cart/addToCart`, { productId: id }, {
        headers: {
          Authorization: `Bearer ${userData?.accessToken}`
        }
      })
      // console.log(res);
      if (res?.status == 200) {
        setAddLoadingButton(false)
        toast({
          position: "top",
          title: `Product Added to Cart Successfully`,
          status: "success",
          duration: 4000,
          isClosable: true,
        })
      }
      // console.log(res)
    } catch (error) {
      // console.log(error)
      setAddLoadingButton(false)
      if (error.response.status == 404) {
        toast({
          position: "top",
          title: `Error While Adding Item to Cart`,
          status: "error",
          duration: 4000,
          isClosable: true,
        })
      }

      if (error.response.status == 401) {
        toast({
          position: "top",
          title: `Please login before adding item to cart`,
          status: "error",
          duration: 2000,
          isClosable: true,
        })
        dispatch(logout());
        navigate("/login")
      }
      // console.log(error)
    }
  }



  // Fetching single product data
  const fetchProduct = async () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    setIsLoading(true)
    try {
      const res = await axios.get(`${baseUrl}/products/singleProduct/${id}`);
      // console.log("product", res)
      // console.log(res.data)
      setProduct(res?.data?.data)
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

  useEffect(() => {
    fetchProduct();
  }, [])

  // Loading while fetch
  if (isLoading) {
    return <Stack>
      <Skeleton height="100px" w="80%" m="auto"></Skeleton>
      <Skeleton height="400px" w="80%" m="auto"></Skeleton>
      <Skeleton height="200px" w="80%" m="auto"></Skeleton>
      <Skeleton height="100px" w="80%" m="auto"></Skeleton>
    </Stack>
  }

  // Hadnling error while fetching failed
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
    <Box w="80%" m="auto" border="1px solid gray" p="10px" borderRadius="5px">
      <Heading fontSize="25px" textAlign="center" mb="40px" textDecoration="underline">Product Detail</Heading>
      <HStack spacing={10}>
        <Box border="1px solid gray" p="20px" borderRadius="5px" w="50%">
          <Image src={product.imageUrl} />
        </Box>
        <Stack spacing={2} h="500px" w="50%">
          <Text color="gray" textDecoration="underline" fontSize="20px">{product.brandName}</Text>
          <Heading fontSize="2xl">{`${product.brandName} ${product.productName} -( ${product.size})`}</Heading>
          {
            product.rating <= 2.5 ? "" :
              <HStack spacing={1} w="10%" justify="center" align="center" borderRadius="full" bgColor="#dff3c9" color="#466f00">
                <Text>{product.rating}</Text>
                <FaStar />
              </HStack>
          }
          <Text as="s" color="gray">{`MRP: ₹${product.strikedPrice}`}</Text>
          <Text fontWeight="700">{`Price: ₹${product.price}`}</Text>
          <Text fontWeight="700" color="#466f00">{`You Save: ${product.discountBadge}% OFF`}</Text>
          <Text color="gray">(inclusive of all taxes)</Text>
          <Button isLoading={addLoadingButton} loadingText="Adding..." onClick={addToCart} variant='solid' colorScheme='red' w="100%" mt="20px" h="60px">
            Add to cart
          </Button>
        </Stack>
      </HStack>
    </Box>
  )
}

export default ProductDetail
