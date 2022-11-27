// Whenever there is sideEffect from the outside that is responsible for state change, like post or get from server. we use flags, in state like loading. req, success and failure.
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: null, // {user : "",token : ""}
    status: {
        idle: true,
        loggedIn: false,
        loggedOut: false,
    },
    error : null,
}


// axios error handling
/* axios.get('/api/xyz/abcd')
  .catch(function (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

  }); */
export const register = createAsyncThunk('auth/register', async (userData, {rejectWithValue}) => {
    try{
    const userToken = await axios.post(`${process.env.REACT_APP_SERVER}/api/register`,userData)
    return userToken // returned as action.payload if fullfilled, its only action reducer is defined below based on this action.
    }catch(error){
        return rejectWithValue(error.response.data.error) // rejectwithvalue middleware is for custom errors otherwise it payload creater will make its own default erron on promise rejection.
    }
})





export const login = createAsyncThunk('auth/login', async (userData, {rejectWithValue}) => {
    try{
    const userToken = await axios.post(`${process.env.REACT_APP_SERVER}/api/login`, userData)
    return userToken // returned as action.payload if fullfilled, its only action reducer is defined below based on this action.
    }catch(error){
        return rejectWithValue(error.response.data.error)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {                                                              // normal reducer for inside actions here action is checkStorage which this redux toolkit creates itself
        checkStorage :  (state)=>{
            const token =  JSON.parse(localStorage.getItem('user'))         // chekcing token data in localstorage after refreshing the page 
            if(token){
            state.user = JSON.parse(localStorage.getItem('user'))
            state.status.idle = true
            state.status.loggedIn = true
            state.status.loggedOut = false
            }
        },

        logout : (state)=>{
            localStorage.removeItem('user')
            state.user = null
            state.status.idle = true
            state.status.loggedIn = false
            state.status.loggedOut = true

        }
    },

    extraReducers: (builder) => {                                       // reducers For outside action creaters
        builder.addCase(register.pending, (state, action) => {
            state.status.idle = false
           
        })
        builder.addCase(register.fulfilled, (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload.data))
            state.user = action.payload.data
            state.status.idle = true
            state.status.loggedIn = true
            state.status.loggedOut = false
        })
        builder.addCase(register.rejected, (state, action) => {
           state.error = action.payload
        })
        builder.addCase(login.pending, (state, action) => {
            state.status.idle = false
           
        })
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload.data))
            state.status.user = action.payload.data
            state.status.idle = true
            state.status.loggedIn = true
            state.status.loggedOut = false
        })
        builder.addCase(login.rejected, (state, action) => {
           state.error = action.payload // action.payload has custom reject with value error if promise is rejected. But by default action.error has error value
        })
    }
})

export default authSlice.reducer
export const {checkStorage, logout} = authSlice.actions