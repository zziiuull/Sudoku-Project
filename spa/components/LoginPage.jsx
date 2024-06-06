import { useNavigate, Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../src/AuthContext'
import { handleKeyPress, handleUserData } from '../utils/utils'

function LoginPage(){
    const [userData, setUserData] = useState({email: "", password: ""})
    const [invalidMsg, setInvalidMsg] = useState("")
    const { updateAuthData } = useContext(AuthContext)
    const navigate = useNavigate()
    
    async function handleLogin(){
        const parameter = {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({email: userData.email, password: userData.password})
        }

        try{    
            const request = await fetch("http://localhost:8000/login", parameter)
            const data = await request.json()
            if (request.ok){
                updateAuthData(data.token, data.email, data.name, data.id)
                navigate("/main")
            }
            else{
                setInvalidMsg(data.message)
            }

        }
        catch(error){
            console.log(error)
        }
    }

    return(

        <div id="login-container">
            <div id="login">
                <input id="email-input" type="text" name="email" placeholder="email" 
                onChange={(e) => handleUserData(e, userData, setUserData)}
                onKeyDown={(e) => handleKeyPress(e, handleLogin)}/>
                
                <input id="password-input" type="password" name="password" placeholder="password"
                onChange={(e) => handleUserData(e, userData, setUserData)}
                onKeyDown={(e) => handleKeyPress(e, handleLogin)}/>

                <button onClick={handleLogin}>Enter</button>

                <p className="invalid">{invalidMsg}</p>
            </div>
            <Link to={"/register"}>Doesn't have an account? Create account</Link>
        </div>
    )   
}

export default LoginPage