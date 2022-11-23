import React, { useEffect } from 'react'
import axios from 'axios'
import './Login.css'
import { loginRequest, loginSuccess, authReducer } from './redux/authReducer'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

    const [formData, setFormData] = React.useState({
        email: "",
        password: ""
    })

    const [error, setError] = React.useState(null)

    const state = useSelector(state => state.authReducer) // selecting state of  authReducer
    const dispatch = useDispatch() // initialize dispatch

    // console.log(formData)

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

console.log("out")
    async function handleRegister(event) {
        try {
            event.preventDefault()
            console.log("1")
            dispatch(loginRequest()) // login req start
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/register`, formData)
            localStorage.setItem("token", JSON.stringify(response.data))
            dispatch(loginSuccess(response.data)) // login req success (see redux states)
            console.log(state)
        } catch (error) {
            if (error)
                setError(error.response.data)
        }
    }

// first dispatch login request so that loading flag is true then post request to the server, then save the response data (which is user email and token) to the localStorage 
// followed by saving in the global state using dispatch(loginSuccess(payload)).

    async function handleLogin(event) {
        try {
            event.preventDefault()
            dispatch(loginRequest())
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/login`, formData)
            localStorage.setItem("token", JSON.stringify(response.data))
            dispatch(loginSuccess(response.data))
        } catch (error) {
            if (error)
                setError(error.response.data)
        }
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
                    {error && <p style={{ "backgroundColor": "#faa2a2", "padding": "10px 2px", "borderRadius": "5px" }}>{error}</p>}
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