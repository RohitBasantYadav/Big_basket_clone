import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItem = createAsyncThunk("fetchCartItem", async () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
        const { accessToken } = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(`${baseUrl}/cart/cartItems`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
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
    reducers: {
        addToCart: (state, action) => {
            
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartItem.fulfilled, (state, action) => {
            // console.log(action.payload)
            state.cartItem = action.payload;
        });
        builder.addCase(fetchCartItem.rejected, (state, action) => {
            // console.log(action.error.message)
            state.error = action.error.message
        });
    }
}))


export const { addToCart, updateCartQuantity, removeCartItem } = cartSlice.actions
export default cartSlice.reducer;