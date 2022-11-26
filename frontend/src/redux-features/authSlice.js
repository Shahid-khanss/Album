// Whenever there is sideEffect from the outside that is responsible for state change, like post or get from server. we use flags, in state like loading. req, success and failure.
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: "",
    status: {
        idle: true,
        loggedIn: false,
        loggedOut: false,
    },
    error : "",
}


export const register = createAsyncThunk('auth/register', async (userData) => {
    
    const userToken = await axios.post(`${process.env.REACT_APP_SERVER}/api/register`,userData)
    return userToken // returned as action.payload if fullfilled, its only action reducer is defined below based on this action.
    
})
export const login = createAsyncThunk('auth/login', async (userData) => {

    const userToken = await axios.post(`${process.env.REACT_APP_SERVER}/api/login`, userData)
    return userToken // returned as action.payload if fullfilled, its only action reducer is defined below based on this action.
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            state.idle = false
           
        })
        builder.addCase(register.fulfilled, (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload.data))
            state.user = action.payload.data
            state.idle = true
            state.loggedIn = true
            state.status.loggedOut = false
        })
        builder.addCase(register.rejected, (state, action) => {
           state.error = action
        })
    }
})

export default authSlice.reducer
