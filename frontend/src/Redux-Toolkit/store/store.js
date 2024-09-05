import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice";
import cartReducer from "../features/cart/cartSlice"
import sensitiveDataFilterMiddleware from "../customMiddlewares/sensitiveDataFilter";

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sensitiveDataFilterMiddleware),
})

export default store;