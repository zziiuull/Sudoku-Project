import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { handleKeyPress, handleUserData } from '../utils/utils'

function RegisterPage(){
    const [userData, setUserData] = useState({username: "", email: "", password: ""})
    const [invalidMsg, setInvalidMsg] = useState("")
    const navigate = useNavigate()

    async function handleCreateAccount(){
        const parameter = {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({username: userData.username, email: userData.email, password: userData.password})
        }

        try{    
            const request = await fetch("http://localhost:8000/register", parameter)
            const data = await request.json()
            if (request.ok){
                navigate("/login")
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
                <input id='username-input' type="text" placeholder='username' name="username"
                onChange={(e) => handleUserData(e, userData, setUserData)}
                onKeyDown={(e) => handleKeyPress(e, handleCreateAccount)}/>

                <input id="email-input" type="text" placeholder="email" name="email"
                onChange={(e) => handleUserData(e, userData, setUserData)}
                onKeyDown={(e) => handleKeyPress(e, handleCreateAccount)}/>

                <input id="password-input" type="password" name="password" placeholder="password"
                onChange={(e) => handleUserData(e, userData, setUserData)}
                onKeyDown={(e) => handleKeyPress(e, handleCreateAccount)}/>

                <button onClick={handleCreateAccount}>Create account</button>

                <p className="invalid">{invalidMsg}</p>
            </div>
            <Link to={"/login"}>Already has an account? Login</Link>
        </div>
    )   
}

export default RegisterPage