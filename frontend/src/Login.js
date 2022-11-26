import React, { useEffect } from 'react'
import './Login.css'
// import { loginRequest, loginSuccess, authReducer } from './redux/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import { register, login } from "./redux-features/authSlice"


const Login = () => {

    const [formData, setFormData] = React.useState({
        email: "",
        password: ""
    })

    const [error, setError] = React.useState(null)

    const state = useSelector(state => state.authReducer) // selecting state of authReducer (userstate)
    const dispatch = useDispatch() // initialize dispatch

    console.log(state)

    function handleChange(event) {
        setFormData(prev => {
            return {
                ...prev, [event.target.name]: event.target.value
            }
        })
    }
    
// first dispatch login (here register) request so that loading flag is true then post request to the server, then save the response data (which is user email and token) to the localStorage 
// followed by saving in the global state using dispatch(loginSuccess(payload)).

//dispatch doesnt update the state immediately.


    async function handleRegister(event) {
        event.preventDefault()
        dispatch(register(formData))
     }

   

// first dispatch login request so that loading flag is true then post request to the server, then save the response data (which is user email and token) to the localStorage 
// followed by saving in the global state using dispatch(loginSuccess(payload)).

    async function handleLogin(event) {
        event.preventDefault()
        dispatch(login(formData))
    }

    return (
        <div className="login-form">
            <form>
                <h1>Login</h1>
                <div className="login-content">
                    <div className="input-field">
                        <input type="email" placeholder="Email" autoComplete="nope" name='email' value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="password" autoComplete="nope" name='password' value={formData.password} onChange={handleChange} />
                    </div>
                    {state.error && <p style={{ "backgroundColor": "#faa2a2", "padding": "10px 2px", "borderRadius": "5px" }}>{state.error}</p>}
                </div>
                <div className="action">
                    <button onClick={handleRegister}>Register</button>
                    <button onClick={handleLogin}>Sign in</button>
                </div>

            </form>
        </div>

    );
}

export default Login;