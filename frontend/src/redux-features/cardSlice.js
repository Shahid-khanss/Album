import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


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

export const fetchCards = createAsyncThunk('card/fetchCards', async () => {
    const cards = await axios.get(`${process.env.REACT_APP_SERVER}/api/`)
    return cards.data
})

export const postCards = createAsyncThunk('card/postCards', async (cardData) => {
    const cards = await axios.post(`${process.env.REACT_APP_SERVER}/api/`, cardData, {headers : {'Content-Type' : "multipart/form-data"}})
    return cards.data
})
export const deleteCards = createAsyncThunk('card/deleteCards', async (id) => {
    const cards = await axios.delete(`${process.env.REACT_APP_SERVER}/api/${id}`)
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