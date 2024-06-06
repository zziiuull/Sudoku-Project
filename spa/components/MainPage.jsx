import React, { useContext } from "react"
import { AuthContext } from '../src/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

function MainPage(){
    const { token, name, eraseAuthData } = useContext(AuthContext)
    const navigate = useNavigate()
    
    async function handleClick(event){
        try{
            const difficulty = event.target.dataset.difficulty
            const parameters = {
                method: "GET", 
                headers: {"Authorization": `Bearer ${token}`}
            }
    
            const request = await fetch("http://localhost:8000/play", parameters)
    
            if (request.ok){
                navigate(`/sudoku/${difficulty}`)
            }
        }
        catch (error){
            console.log(error)
        }
    }

    function handleNavigate(path){
        navigate(path)
    }

    function handleLogOut(){
        eraseAuthData()
        navigate("/login")
    }

    return(
        <>
            <div id="main-container">
                <header>
                    <div>Logged in as <span id='span'>{name}</span></div>
                    <div id="buttons-container">
                        <button className="header-buttons" onClick={() => handleNavigate("/rank")}>Rank</button>
                        <button className="header-buttons" onClick={() => handleNavigate("/historic")}>Historic</button>
                        <button className="header-buttons" onClick={handleLogOut}>Logout</button>                    
                    </div>
                </header>
                <main>
                    <div id="difficulty">
                        <h1>Choose a difficulty</h1>
                    </div>
                    <div id="difficulty-cards">
                        <div className="cards" id="easy" data-difficulty="easy" onClick={handleClick}>EASY</div>
                        <div className="cards" id="medium" data-difficulty="medium" onClick={handleClick}>MEDIUM</div>
                        <div className="cards" id="hard" data-difficulty="hard" onClick={handleClick}>HARD</div>
                    </div>
                </main>
                <footer>
                    Made by Luiz =) 
                </footer>
            </div>
        </>
    )
}

export default MainPage