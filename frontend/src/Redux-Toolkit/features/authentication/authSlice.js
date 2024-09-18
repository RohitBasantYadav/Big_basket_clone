import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// Thunk Middleware in RTK
// Login Thunk
export const fetchToken = createAsyncThunk("fetchToken", async (userDetails) => {
    try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const res = await axios.post(`${baseUrl}/user/auth/login`, userDetails);
        // console.log(res.data.accessToken, res.data.refreshToken)
        return res?.data;
    } catch (error) {
        // console.log(error.response.status)
        return Promise.reject(error.response.status);
    }

});
const user = JSON.parse(localStorage.getItem("user"));
// Initial state
const initialState = {
    isLoggedIn: user?.isLoggedIn || false,
    accessToken: null,
    refreshToken: null,
    error: false
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // login: (state, action) => {
        //     state.isLoggedIn = true,
        //     state.token = action.payload
        // },
        logout: (state) => {
            state.isLoggedIn = false,
            state.accessToken = null;
            state.refreshToken = null;
            state.error = false;
            // localStorage.removeItem("accessToken");
            // localStorage.removeItem("refreshToken");
            localStorage.setItem("user", JSON.stringify(state));
        }
    },
    // login logic is here
    extraReducers: (builder) => {
        builder.addCase(fetchToken.fulfilled, (state, action) => {
            // console.log(action.type)
            // console.log(action.payload)
            state.isLoggedIn = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            localStorage.setItem("user", JSON.stringify(state));
            // localStorage.setItem("accessToken", action.payload.accessToken);
            // localStorage.setItem("refreshToken", action.payload.refreshToken);
        });
        builder.addCase(fetchToken.rejected, (state, action) => {
            // console.log(`Error while login: ${action.error.message}`)
            state.error = action.error.message;
        })
    }
})


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;