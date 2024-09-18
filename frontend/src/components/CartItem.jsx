import { AddIcon, MinusIcon } from "@chakra-ui/icons"
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, ButtonGroup, HStack, IconButton, Image, Skeleton, Stack, Text, useToast, VStack } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux-Toolkit/features/authentication/authSlice";
import { fetchCartItem } from "../Redux-Toolkit/features/cart/cartSlice";

const CartItem = ({ _id, productId, userId, quantity, price }) => {
    // console.log(props)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [incButtonLoading, setIncButtonLoading] = useState(false);
    const [decButtonLoading, setDecButtonLoading] = useState(false);
    const [removeButtonLoading, setRemoveButtonLoading] = useState(false);
    const [error, setError] = useState(false);
    // const [count, setCount] = useState(2);
    const toast = useToast();

    const state = useSelector((state) => state.cart.cartItem)
    const baseUrl = import.meta.env.VITE_API_URL;

    const fetchProduct = async (token) => {
        setIsLoading(true)
        try {
            const res = await axios.get(`${baseUrl}/products/singleProduct/${productId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            // console.log("product",res)
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
        const userData = JSON.parse(localStorage.getItem("user"));
        if(userData){
          const {accessToken} = userData;
        fetchProduct(accessToken);
        }
        else{
          navigate("/login");
          toast({
            position: "top",
            title: `Please login before accessing this page`,
            status: "error",
            duration: 4000,
            isClosable: true,
          })
        }
    }, [])


    // Quantity handler buttons Funtionality
    const incrementCartQuantity = async()=>{
        setIncButtonLoading(true);
        try {
            const { accessToken } = JSON.parse(localStorage.getItem("user"));
            const baseUrl = import.meta.env.VITE_API_URL;
            const res = await axios.patch(`${baseUrl}/cart/updateCart`,{ productId,inc:1 },{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            })
            // console.log(res)
            if(res?.status == 200){
                dispatch(fetchCartItem());
                setIncButtonLoading(false);
                toast({
                    position: "top",
                    title: `Product quantity Increased`,
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  })
            }
        } catch (error) {
            setIncButtonLoading(false)
            if(error.response.status == 404){
                toast({
                    position: "top",
                    title: `Error While Adding Item to Cart`,
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                  })
            }
            console.log("error",error)
        }
    }

    const decrementCartQuantity = async()=>{
        setDecButtonLoading(true)
        try {
            const { accessToken } = JSON.parse(localStorage.getItem("user"));
            const baseUrl = import.meta.env.VITE_API_URL;
            const res = await axios.patch(`${baseUrl}/cart/updateCart`,{ productId,dec:1 },{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            })
            // console.log(res)
            if(res?.status == 200){
                setDecButtonLoading(false)
                dispatch(fetchCartItem());
                toast({
                    position: "top",
                    title: `Product quantity decreased`,
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  })
            }
        } catch (error) {
            setDecButtonLoading(false)
            if(error.response.status == 404){
                toast({
                    position: "top",
                    title: `Error While Adding Item to Cart`,
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                  })
            }
            // console.log("error",error)
        }
    }

    // Remove Item Button functionality
    const removeItem = async() => {
        setRemoveButtonLoading(true)
        try {
            const { accessToken } = JSON.parse(localStorage.getItem("user"));
            const baseUrl = import.meta.env.VITE_API_URL;
            const res = await axios.delete(`${baseUrl}/cart/remove`,{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                },
                data: { productId }
            })
            // console.log(res)
            if(res?.status == 200){
                setRemoveButtonLoading(false)
                dispatch(fetchCartItem());
                toast({
                    position: "top",
                    title: `Product Deleted from the Cart Successfully`,
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  })
            }
        } catch (error) {
            setRemoveButtonLoading(false)
            if(error.response.status == 404){
                toast({
                    position: "top",
                    title: `Error While Adding Item to Cart`,
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                  })
            }
            console.log("error",error)
        }
    }

    // Loading while fetching data
    if (isLoading) {
        return <Stack>
            <Skeleton height="200px" w="80%" m="auto"></Skeleton>
            <Skeleton height="200px" w="80%" m="auto"></Skeleton>
            <Skeleton height="200px" w="80%" m="auto"></Skeleton>
            <Skeleton height="200px" w="80%" m="auto"></Skeleton>
        </Stack>
    }

    // Error while Fetching Data
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
        <Box>
            <HStack border="1px solid gray" my="40px" fontSize="18px" justify="space-between" p="10px" borderRadius="5px">

                <HStack spacing={10} w="50%">
                    <Box border="1px solid gray" w="20%" p="15px" borderRadius="10px">
                        <Image src={product.imageUrl} alt="product-img" />
                    </Box>
                    <Box>
                        <Text>{product.productName}</Text>
                        <HStack>
                            <Text fontWeight="bold">₹{product.price}</Text>
                            <Text as="s" color="gray">₹{product.strikedPrice}</Text>
                        </HStack>
                    </Box>
                </HStack>


                <HStack justify="space-around" w="50%">
                    <VStack>
                        <ButtonGroup size='sm' isAttached variant='outline'>
                            <IconButton isLoading={incButtonLoading} onClick={incrementCartQuantity} aria-label='Add to friends' icon={<AddIcon />} />
                            <Button w="100px">{quantity}</Button>
                            <IconButton isLoading={decButtonLoading} onClick={decrementCartQuantity} aria-label='Add to friends' icon={<MinusIcon />} />
                        </ButtonGroup>
                        <Button loadingText="Removing..." isLoading={removeButtonLoading} onClick={removeItem} w="100%" colorScheme="red">Remove</Button>
                    </VStack>
                    <Box>
                        <Text fontWeight="bold">{`₹${product.price * quantity}`}</Text>
                        <Text color="green" fontSize="14px">{`Saved: ₹${((product.strikedPrice - product.price) * quantity).toFixed(1)}`}</Text>
                    </Box>
                </HStack>
            </HStack>
        </Box>
    )
}

export default CartItem
