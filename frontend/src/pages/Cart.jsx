import { Box, Heading, HStack, Text } from "@chakra-ui/react"
import CartItem from "../components/CartItem"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { fetchCartItem } from "../Redux-Toolkit/features/cart/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.cart.cartItem)
    // console.log(state)
    // console.log("a")
    useEffect(() => {
        dispatch(fetchCartItem())
    }, [state])
    return (
        <Box w="80%" m="auto">
            <Heading>Your Basket</Heading>
            <HStack color="gray" my="40px" fontSize="18px" fontWeight="500" justify="space-between">
                <Box w="50%">
                    <Text>{`Items(${state.length})`} </Text>
                </Box>
                <HStack w="40%" justify="space-between">
                    <Text>Quantity </Text>
                    <Text>Sub-total </Text>
                </HStack>
            </HStack>
            {state.map((item) => <CartItem key={item._id} {...item} />)}
        </Box>
    )
}

export default Cart
