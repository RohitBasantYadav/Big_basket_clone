import { Box, Button, Heading, HStack, Text, useToast } from "@chakra-ui/react"
import CartItem from "../components/CartItem"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { fetchCartItem } from "../Redux-Toolkit/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../Redux-Toolkit/features/authentication/authSlice";




const Cart = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItem)
    // console.log(cartItems)
    // console.log("a")

    // Making fetchRequest through reduxThunk
    useEffect(() => {
        dispatch(fetchCartItem()).then((res)=>{
            // console.log(res);
            if(res?.error?.message == "401"){
                toast({
                    position: 'top',
                    title: 'Please Login before accessing CartPage',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
                dispatch(logout());
                navigate("/login");
            }
        }).catch((error)=>{
            console.log("errorInCart",error)
        })

    }, [navigate,toast,dispatch]);

    const subTotal = cartItems.reduce((accum, currValue) => (accum + currValue.price) * currValue.quantity, 0);
    // console.log(subTotal)

    const handleCheckout = async () => {
        try {
            const { accessToken } = JSON.parse(localStorage.getItem("user"));
            const baseUrl = import.meta.env.VITE_API_URL;

            // Wait for all delete requests to complete using Promise.all
            await Promise.all(cartItems.map(async (item) => {
                return axios.delete(`${baseUrl}/cart/remove`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    data: { productId: item.productId }
                });
            }));

            toast({
                position: 'top',
                title: 'Your Order is placed successfully',
                description: "You will get you delivery within 1 day",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            // Once all deletions are complete, refresh the page
            window.location.reload();

        } catch (error) {
            console.log(error)
        }


    }

    return (
        <Box w="80%" m="auto">
            <Heading borderBottom="2px solid green">Your Basket</Heading>

            {/* CheckOut Section */}
            <HStack p="30px" mt="20px" fontSize="20px" fontWeight="bold" justify="space-between" align="center" borderRadius="10px" bgColor="black">
                <Box color="white">
                    <Text>{`Subtotal(${cartItems.length} items): ₹${subTotal}`}</Text>
                </Box>
                <Box w="20%">
                    <Button onClick={handleCheckout} fontWeight="bold" colorScheme="red" w="100%">Checkout</Button>
                </Box>
            </HStack>

            {/* Cart Item Section */}
            <HStack color="gray" my="40px" fontSize="18px" fontWeight="500" justify="space-between">
                <Box w="50%">
                    <Text>{`Items(${cartItems.length})`} </Text>
                </Box>
                <HStack w="40%" justify="space-between">
                    <Text>Quantity </Text>
                    <Text>Sub-total </Text>
                </HStack>
            </HStack>
            {cartItems.map((item) => <CartItem key={item._id} {...item} />)}
        </Box>
    )
}

export default Cart
