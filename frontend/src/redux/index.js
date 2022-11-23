import {combineReducers} from 'redux'

import { authReducer } from './authReducer'
import { formReducer } from './cardState'

export const rootReducer = combineReducers({
    authReducer,
    formReducer
})