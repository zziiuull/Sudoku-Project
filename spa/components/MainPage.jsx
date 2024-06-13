import React, { useContext, useEffect } from "react"
import { AuthContext } from '../src/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

function MainPage(){
    const { token, name, eraseAuthData } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        const slide = document.querySelector(".logos-slide")
        const clonedSlide = slide.cloneNode(true)
        slide.parentNode.appendChild(clonedSlide)
    }, [])

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
                        <button className="header-buttons" onClick={() => handleNavigate("/history")}>History</button>
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
                    <div className="logos-slide">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original-wordmark.svg" />
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg" />   
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" />
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />        
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sequelize/sequelize-original.svg" /> 
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" />    
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" />
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" />
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodemon/nodemon-original.svg" />
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" />              
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg" />
                    </div>
                </footer>
            </div>
        </>
    )
}

export default MainPage