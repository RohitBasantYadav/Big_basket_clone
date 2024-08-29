import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice";
import sensitiveDataFilterMiddleware from "../customMiddlewares/sensitiveDataFilter";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sensitiveDataFilterMiddleware),
})

export default store;