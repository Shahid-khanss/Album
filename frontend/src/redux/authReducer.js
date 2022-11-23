const initialState = {
    user: null
}

function login(payload) {
    return {
        type: "LOGIN",
        payload: payload
    }
}
function logout() {
    return {
        type: "LOGOUT"
    }
}

export const authReducer = (state=initialState, action)=>{
    switch(action.type){
        case "LOGIN" : return {user : action.payload}
        case "LOGOUT" : return {user : null}
        default : return state
    }
}
