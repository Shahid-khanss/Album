import axios from 'axios'
import thunk from "redux-thunk"

const initialState = {
    loading: false,
    uploading: false,
    deleting : false,
    data: [],
    error: ""
    
}

const FETCH_CARDS_REQUEST = "FETCH_CARDS_REQUEST"
const FETCH_CARDS_SUCCESS = "FETCH_CARDS_SUCCESS"
const FETCH_CARDS_FAILURE = "FETCH_CARDS_FAILURE"
const POST_CARDS_REQUEST = "POST_CARDS_REQUEST"
const POST_CARDS_DONE = "POST_CARDS_DONE"
const DELETE_CARD = "DELETE_CARD"
const DELETE_CARD_DONE = "DELETE_CARD_DONE"

const fetchCardsRequest = () => {
    return {
        type: FETCH_CARDS_REQUEST,

    }
}
const fetchCardsSuccess = (cards) => {
    return {
        type: FETCH_CARDS_SUCCESS,
        payload: cards
    }
}
const fetchCardsFailure = (error) => {
    return {
        type: FETCH_CARDS_FAILURE,
        payload: error
    }
}

const postCardsRequest = (payload) => {
    return {
        type: POST_CARDS_REQUEST,
        payload: payload

    }
}
const postCardsDone = () => {
    return {
        type: POST_CARDS_DONE,
        

    }
}
export const deleteCard = () => {
    return {
        type: DELETE_CARD,
        

    }
}


export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CARDS_REQUEST: return {
            ...state,

            loading: true
        }
        case FETCH_CARDS_SUCCESS: return {
            ...state,
            data: action.payload,
            loading: false
        }

        case FETCH_CARDS_FAILURE: return {
            ...state,
            error: action.payload
        }

        case POST_CARDS_REQUEST: return {
            ...state,
            uploading: true,
            }
        case POST_CARDS_DONE: return {
            ...state,
            uploading: false,
        }

        case DELETE_CARD : return {
            ...state,
            deleting : true
        }
        case DELETE_CARD_DONE : return {
            ...state,
            deleting : false
        }

        default: return {
            ...state
        }
    }
}


export const getCardsdata = () => {
    return function (dispatch) {
        dispatch(fetchCardsRequest())
        axios.get("http://192.168.0.111:4000/api")
            .then((res) => {
                dispatch(fetchCardsSuccess(res.data))
            })
            .catch(err => dispatch(fetchCardsFailure(err.message)))

    }
}

export const postCardsdata = (payload) => {
    return function (dispatch) {
        dispatch(postCardsRequest())
        axios.post("http://192.168.0.111:4000/api", payload, { headers: { 'Content-Type': "multipart/form-data" } })
            .then(data => {
                dispatch(postCardsDone())
            }).catch(err => console.log(err))
    }
}