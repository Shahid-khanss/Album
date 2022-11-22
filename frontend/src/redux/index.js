import redux from 'redux'

import { authReducer } from './authReducer'
import { formReducer } from './cardState'

export const rootReducer = redux.combineReducers({
    authReducer,
    formReducer
})