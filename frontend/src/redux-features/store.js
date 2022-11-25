import { cardActions } from "./cardSlice";
import cardReducer from "./cardSlice"
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer : {
        cardReducer,
    }
})


export default store