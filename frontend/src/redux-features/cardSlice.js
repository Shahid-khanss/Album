import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    status: "idle", // downloading | uploading | deleting
    data: [],
    error: "",
}
// these thunk function create action.paylod based on promise pending, fulfilled and rejected.

export const fetchCards = createAsyncThunk('card/fetchCards', async () => {
    const cards = await axios.get(`${process.env.REACT_APP_SERVER}/api/`)
    return cards.data
})

export const postCards = createAsyncThunk('card/postCards', async (userData) => {
    const cards = await axios.post(`${process.env.REACT_APP_SERVER}/api/`, userData)
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
            state.status = "downloading"
        })
        builder.addCase(fetchCards.fulfilled, (state, action) => {
            state.status = "idle"
            state.data = action.payload
        })
        builder.addCase(fetchCards.rejected, (state, action) => {
            state.error = action.payload
            state.downloading = "idle"
        })
        builder.addCase(postCards.pending, (state) => {
            state.status = "uploading"
        })
        builder.addCase(postCards.fulfilled, (state) => {
            state.status = "idle"
            
        })
        builder.addCase(postCards.rejected, (state, action) => {
            state.error = action.payload
            state.status = "idle"
        })
        builder.addCase(deleteCards.pending, (state) => {
            state.status = "deleting"
        })
        builder.addCase(deleteCards.fulfilled, (state) => {
            state.status = "idle"
            
        })
        builder.addCase(deleteCards.rejected, (state, action) => {
            state.error = action.payload
            state.status = "idle"
        })
    }

})




export default cardSlice.reducer