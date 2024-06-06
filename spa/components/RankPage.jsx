import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from '../src/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

function RankPage(){
    const [ranks, setRanks] = useState([])
    const {token} = useContext(AuthContext)
    const [difficulty, setDifficulty] = useState("easy")
    const navigate = useNavigate()

    useEffect(() => {
        async function getRanks(){
            const parameters = {
                method: "GET",
                headers: {"Authorization": `Bearer ${token}`}
            }
            try{
                const request = await fetch(`http://localhost:8000/rank/${difficulty}`, parameters)
                const data = await request.json()
                if (request.ok){
                    setRanks(data.data)
                }
            }
            catch (error){
                console.log(error)
            }
        }getRanks()
    }, [difficulty])    

    function handleBackClick(){
        navigate("/main")
    }

    return (
        <>
            <div id="top-container">
                <button id="back-button"  className="sudoku-button" onClick={handleBackClick}>&lt;-</button>
                <p>Global rank for <span id="span">{difficulty}</span> difficulty</p>
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
                    {ranks.length == 0 ? <div id="no-games">No rank available</div> :
                    <table id="table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Time to complete</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranks.map((rank, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{rank.user.name}</td>
                                    <td>{rank.minutes < 10 ? "0" + rank.minutes : rank.minutes}:{rank.seconds < 10 ? "0" + rank.seconds : rank.seconds}</td>
                                    <td>{
                                        new Date(rank.createdAt).toLocaleString('pt-BR', {
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

export default RankPage