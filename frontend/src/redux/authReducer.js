// Whenever there is sideEffect from the outside that is responsible for state change, like post or get from server. we use flags, in state like loading. req, success and failure.


const initialState = {
    user: null,
    loading : false
}


function loginRequest(){
    return{
        type : "LOGIN_REQ"
    }
}

function loginSuccess(payload) {
    return {
        type: "LOGIN_SUCCESS",
        payload: payload
    }
}

function logoutReq() {
    return {
        type: "LOGOUT_REQ"
    }
}
function logoutSuccess() {
    return {
        type: "LOGOUT_SUCEESS"
    }
}
const authReducer = (state=initialState, action)=>{
    switch(action.type){
        case "LOGIN_REQ" : return {
            ...state,loading : true
        }
        case "LOGIN_SUCCESS" : return {
            user : action.payload, loading : false
        }
        case "LOGOUT_REQ" : return {
            ...state, loading : true
        }
        case "LOGOUT_SUCCESS" : return {
            state : null, loading : false
        }
        default : return state
    }
}

export {
    loginRequest, 
    loginSuccess, 
    logoutReq, 
    logoutSuccess, 
    authReducer
}