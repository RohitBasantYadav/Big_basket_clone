import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItem = createAsyncThunk("fetchCartItem", async () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(`${baseUrl}/cart/cartItems`, {
            headers: {
                Authorization: `Bearer ${userData?.accessToken}`
            }
        });
        return res.data.data; // Return only the data (cart items)
    } catch (error) {
        return Promise.reject(error.response.status);
    }
});

const initialState = {
    cartItem: [],
    error: false,
};

const cartSlice = (createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCartItem.fulfilled, (state, action) => {
            // console.log(action.payload)
            state.cartItem = action.payload;
            localStorage.setItem("cartItems",JSON.stringify(action.payload))
        });
        builder.addCase(fetchCartItem.rejected, (state, action) => {
            // console.log(action.error.message)
            state.error = action.error.message
        });
    }
}))


// export const { addToCart, updateCartQuantity, removeCartItem } = cartSlice.actions
export default cartSlice.reducer;