import { cardActions } from "./cardSlice";
import cardReducer from "./cardSlice"
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"


const store = configureStore({
    reducer : {
        authReducer,
        cardReducer,
        
    }
})


export default store