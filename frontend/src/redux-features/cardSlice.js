import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


// const authState = store.getState()



const initialState = {
    status: {
        downloading : false,
        uploading : false,
        deleting : false,
        idle : true
    }, // downloading | uploading | deleting
    data: [],
    error: "",
    
 }
// these thunk function create action.paylod based on promise pending, fulfilled and rejected.


export const fetchCards = createAsyncThunk('card/fetchCards', async (_,{getState}) => {
    const {user} = getState().authReducer
    // console.log(getState().authReducer)          
    const cards = await axios.get(`${process.env.REACT_APP_SERVER}/api/cards`, {headers : {'Content-Type' : "multipart/form-data", "Authorization" : `Bearer ${user.token}`}})
    return cards.data
})
/* 
    // we can access authReducer (or any other reducer state from the store) from getState (as second argument) in thunk function only in redux toolkit.
    In other words if we have to access any global state from the store in the slices, we can use getState in thunk function.
    Here we are accessing token from the global auth state.
    We are seding token as {headers : {'Content-Type' : "multipart/form-data", "Authorization" : `Bearer ${user.token}`}. So that backend server can see if the token is valid 
    and based on this token we get acces to the data from backend.
*/
export const postCards = createAsyncThunk('card/postCards', async (cardData, {getState}) => {
    const {user} = getState().authReducer
    const cards = await axios.post(`${process.env.REACT_APP_SERVER}/api/cards`, cardData, {headers : {'Content-Type' : "multipart/form-data", "Authorization" : `Bearer ${user.token}`}})
    return cards.data
})
export const deleteCards = createAsyncThunk('card/deleteCards', async (id, {getState}) => {
    const {user} = getState().authReducer
    const cards = await axios.delete(`${process.env.REACT_APP_SERVER}/api/cards/${id}`, {headers : {'Content-Type' : "multipart/form-data", "Authorization" : `Bearer ${user.token}`}})
    return cards.data
})

export const cardSlice = createSlice({
    name: "card",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCards.pending, (state) => {
            state.status.downloading = true
            state.status.idle = false
        })
        builder.addCase(fetchCards.fulfilled, (state, action) => {
            state.status.downloading = false
            state.status.idle = true
            state.data = action.payload
                   
        })
        builder.addCase(fetchCards.rejected, (state, action) => {
            state.error = action.payload
            state.status.downloading = false
            state.status.idle = true
        })
        builder.addCase(postCards.pending, (state) => {
            state.status.uploading = true
            state.status.idle = false
            
        })
        builder.addCase(postCards.fulfilled, (state) => {
            state.status.uploading = false
            state.status.idle = true
            
        })
        builder.addCase(postCards.rejected, (state, action) => {
            state.error = action.payload
            state.status.uploading = false
            state.status.idle = true
            
        })
        builder.addCase(deleteCards.pending, (state) => {
            state.status.deleting = true
            state.status.idle = false
        })
        builder.addCase(deleteCards.fulfilled, (state) => {
            state.status.deleting = false
            state.status.idle = true
            
        })
        builder.addCase(deleteCards.rejected, (state, action) => {
            state.error = action.payload
            state.status.deleting = false
            state.status.idle = true
        })
    }

})




export default cardSlice.reducer