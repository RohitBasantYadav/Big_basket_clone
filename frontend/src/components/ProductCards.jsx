import { Box, Button, Card, CardBody, CardFooter, HStack, Image, Stack, Text, useToast,  } from "@chakra-ui/react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { logout } from "../Redux-Toolkit/features/authentication/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";


const ProductCards = ({imageUrl,discountBadge,brandName,productName,size,price,strikedPrice,productId}) => {
    const [addLoadingButton, setAddLoadingButton] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast()
    const baseUrl = import.meta.env.VITE_API_URL;
    
    const addToCart = async()=>{
        setAddLoadingButton(true);
        try {
            const userData = JSON.parse(localStorage.getItem("user"))
            const res = await axios.post(`${baseUrl}/cart/addToCart`,{productId:productId},{
                headers:{
                    Authorization:`Bearer ${userData?.accessToken}`
                }
            })
            // console.log(res);
            if(res?.status == 200){
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
            if(error.response.status == 404){
                toast({
                    position: "top",
                    title: `Error While Adding Item to Cart`,
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                  })
            }
            
            if(error.response.status == 401){
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

    return (
        <Box>
            <Card maxW="xs" boxShadow="xl" borderRadius="10px">
                <CardBody cursor="pointer" onClick={()=>navigate(`/product/productDetail/${productId}`)}>
                    <Box border="1px solid" borderColor="gray.200" borderRadius="10px" p="25px" position="relative" >
                    <Image
                        src={imageUrl}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                        w="100%"
                        objectFit="scale-down"
                    />
                    <Box border="1px solid green" borderRadius="10px 0 10px 0" w="35%" p="5px 2px" position="absolute" top="0" left="0" bgColor="#466f00" color="white">
                        <Text fontWeight="bold" fontSize="12px" textAlign="center">{`${discountBadge}% OFF`}</Text>
                    </Box>
                    </Box>
                    <Stack mt='6' spacing={1}>
                        <Text color="gray">{brandName}</Text>
                        <Text fontSize="18px" mb="40px" noOfLines={1}>{productName}</Text>
                        <Box border="1px solid" borderColor="gray.200" borderRadius="4px" px="10px" bgColor="#ece8e8" mb="5px">
                            <Text>{size}</Text>
                        </Box>

                        <HStack mb="20px">
                        <Text fontWeight="bold" fontSize='md'>
                            {`₹${price}`}
                        </Text>
                        <Text as="s" fontSize="sm" color="gray">{`₹${strikedPrice}`}</Text>
                        </HStack>

                    </Stack>
                </CardBody>

                <CardFooter>
                        <Button isLoading={addLoadingButton} loadingText="Adding..." onClick={addToCart} variant='outline' colorScheme='red' w="100%" _hover={{bgColor:"red", color:"white"}}>
                            Add
                        </Button>
                </CardFooter>
            </Card>
        </Box>
    )
}

export default ProductCards
