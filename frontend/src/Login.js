import React from 'react'
import axios from 'axios'
import './Login.css'

const Login = () => {
    
const [formData, setFormData] = React.useState({
    email : "",
    password : ""
})

const [error, setError] = React.useState(null)

// console.log(formData)
    
function handleChange(event){
    setFormData(prev=>{
        return {
            ...prev, [event.target.name] : event.target.value
        }
    })
}


    
    async function handleRegister(event){
        try {event.preventDefault()
       const response = await axios.post("http://localhost:4000/register", formData)
       localStorage.setItem("token" , JSON.stringify(response.data))
    }catch(error){
        if(error)
        setError(error.response.data)
    }
    }
    async function handleLogin(event){
        event.preventDefault()
        axios.post("http://localhost:4000/login", formData)
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
                    {error && <p>{error}</p>}
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