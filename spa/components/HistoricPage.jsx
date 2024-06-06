import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from '../src/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

function HistoricPage(){
    const { token, id, name } = useContext(AuthContext)
    const [gamesHistoric, setGamesHistoric] = useState([])
    const [difficulty, setDifficulty] = useState("easy")
    const navigate = useNavigate()

    useEffect(() => {
            async function getGames(){
                const parameters = {
                    method: "GET",
                    headers: {"Authorization": `Bearer ${token}`}
                }
                try{
                    const request = await fetch(`http://localhost:8000/finished/${id}/${difficulty}`, parameters)
                    const data = await request.json()
                    if (request.ok){
                        setGamesHistoric(data.data)
                    }
                }
                catch (error){
                    console.log(error)
                }
            }getGames()
    }, [difficulty])

    function handleBackClick(){
        navigate("/main")
    }

    return(
        <>
            <div id="top-container">
                <button id="back-button"  className="sudoku-button" onClick={handleBackClick}>&lt;-</button>
                <p>Your <span id='span'>{difficulty}</span> games historic, <span id='span'>{name}</span></p>
            </div>
            <div id="content-container">
                <div id="">
                    <div>
                        <input type="radio" name="radio" id="easy-radio" checked={difficulty === "easy"} onChange={() => setDifficulty("easy")}/>
                        <label htmlFor="easy-radio" onChange={() => setDifficulty("easy")}> easy</label>
                    </div>
                    <div>
                        <input type="radio" name="radio" id="medium-radio" checked={difficulty === "medium"} onChange={() => setDifficulty("medium")}/>
                        <label htmlFor="medium-radio" onChange={() => setDifficulty("medium")}> medium</label>
                    </div>
                    <div>
                        <input type="radio" name="radio" id="hard-radio" checked={difficulty === "hard"} onChange={() => setDifficulty("hard")}/>
                        <label htmlFor="hard-radio" onChange={() => setDifficulty("hard")}> hard</label>
                    </div>
                </div>
                <div id="table-container">
                    {gamesHistoric.length == 0 ? <div id="no-games">No games</div> :
                    <table id="table">
                    <thead>
                        <tr>
                            <th>Time to complete</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gamesHistoric.map((game, i) => {
                            return (
                                <tr key={i}>
                                    <td>{game.minutes < 10 ? "0" + game.minutes : game.minutes}:{game.seconds < 10 ? "0" + game.seconds : game.seconds}</td>
                                    <td>{
                                        new Date(game.createdAt).toLocaleString('pt-BR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: false
                                        }).replace(",", "")
                                    }</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                    }
                </div>
            </div>
        </>
    )
}

export default HistoricPage