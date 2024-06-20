import React, {useState, useEffect, useRef, useContext} from "react"
import { useNavigate } from 'react-router-dom'
import getSudokuGame from "../../src/sudoku-generator.js"
import { isGameFinished } from "../../src/main.js"
import PopupRestart from "./PopupRestart.jsx"
import PopupContinue from "./PopupContinue.jsx"
import { AuthContext } from '../src/AuthContext'

function Sudoku(props){
    const [sudokuLines, setSudokuLines] = useState([])
    const [selectedItems, setSelected] = useState([])
    const [gameStatus, setGameStatus] = useState({finished: false, time: false})
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(10)
    const [isPaused, setIsPaused] = useState(false)
    const [continueGame, setContinueGame] = useState(false)
    const timerRef = useRef(null)
    const navigate = useNavigate()
    const [rgb, setRgb] = useState(0)

    const { token, id } = useContext(AuthContext)

    useEffect(() => {
        async function getUnfinishedBoard(){
            const parameters = {
                        method: "GET", 
                        headers: {"Authorization": `Bearer ${token}`}
                    }
            try{
                const request = await fetch(`http://localhost:8000/unfinished/${id}/${props.difficulty}`, parameters)
                const data = await request.json()
                if (request.ok){
                    if (data.minutes >= 0 && data.seconds > 0){
                        setContinueGame(true)
                        setIsPaused(true)
                        setSudokuLines(data.board)
                        setMinutes(data.minutes)
                        setSeconds(data.seconds)
                    }
                }
                else{
                    setSudokuLines(getSudokuGame(props.difficulty))
                }
            }   
            catch (error){
                console.log(error)
            }
        }
        getUnfinishedBoard()
    }, [])

    useEffect(() => {
        startTimer()
        if (minutes == 0 && seconds == 0){
            setGameStatus({finished: true, time: true})
        }
        const timer = document.getElementById('timer-value')
        if (timer.style.color != "rgb(255, 0, 0)"){
            setRgb(((10 - minutes) * 60 + 60 - seconds) * 0.425)
            
        }
        return () => clearInterval(timerRef.current)
    }, [seconds, minutes])

    useEffect(() => {
        if (isPaused) {
            clearInterval(timerRef.current);
        } else {
            startTimer();
        }
    }, [isPaused]);

    useEffect(() => {
        if (gameStatus.finished){
            setIsPaused(true)
            if (minutes >= 0 && seconds > 0){
                function getTime(minutes, seconds){
                    if (60 - seconds == 60){
                        minutes = 10 - minutes
                    }
                    else{
                        seconds = 60 - seconds
                        minutes = 10 - (minutes + 1)
                    }
                    return {minutes: minutes, seconds: seconds}
                }
                async function insertFinishedGame(){
                    const time = getTime(minutes, seconds)
                    const parameter = {
                        method: "POST",
                        headers: {"Content-type": "application/json", "Authorization": `Bearer ${token}`},
                        body: JSON.stringify(
                            {id_p: id, difficulty: props.difficulty, 
                            minutes: time.minutes, seconds: time.seconds})
                    }
                    const request = await fetch("http://localhost:8000/finished", parameter)
                    const data = await request.json()
                    if (request.ok){
                        console.log(data.message)
                    }
                }insertFinishedGame()
            }
        }
    }, [gameStatus])

    function startTimer(){
        if (timerRef.current) clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            if (!isPaused) {
                setSeconds(prevSeconds => {
                    if (prevSeconds === 0) {
                        if (minutes === 0) {
                            clearInterval(timerRef.current)
                            return 0
                        }
                        setMinutes(prevMinutes => prevMinutes - 1)
                        return 59
                    }
                    return prevSeconds - 1
                })
            }
        }, 1000)
    }

    function handleChange(event, line, column){
        const value = event.target.value

        if (/^[1-9]?$/.test(value)) {
            const newSudokuLines = [...sudokuLines];
            newSudokuLines[line][column] = {
                v: isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10), 
                i: -1}
            setSudokuLines(newSudokuLines);
            if (sudokuLines.flat().filter(v => v.v > 0).length == 81 &&
                isGameFinished(sudokuLines, value, line, column)){
                    setGameStatus({finished: true, time: false})
            }
        }
        else{
            event.target.value = ""
        }
    }

    function handleMouseOver(line, column){
        const quadrantSize = 3;
        const startLine = Math.floor(line / quadrantSize) * quadrantSize
        const endLine = startLine + quadrantSize
        const startColumn =  Math.floor(column / quadrantSize) * quadrantSize
        const endColumn = startColumn + quadrantSize
        let items = []
        document.querySelectorAll(".square")
        .forEach(s => {
            if (s.dataset.posline == line || 
                s.dataset.poscolumn == column ||
                ((s.dataset.posline >= startLine && s.dataset.posline < endLine) &&
                (s.dataset.poscolumn >= startColumn && s.dataset.poscolumn < endColumn)))
                s.classList.add("selected", props.difficulty)
                items.push(s)
        })
        setSelected(items)
    }

    function handleMouseLeave(){
        selectedItems
        .forEach(s => s.classList.remove("selected", props.difficulty))
    }

    async function handleBackClick(){
        const parameter = {
            method: "POST",
            headers: {"Content-type": "application/json", "Authorization": `Bearer ${token}`},
            body: JSON.stringify(
                {id_p: id, difficulty: props.difficulty, 
                board: sudokuLines, minutes: minutes, seconds: seconds})
        }

        const parameter_delete = {
            method: "DELETE",
            headers: {"Authorization": `Bearer ${token}`}
        }

        try{
            const request_delete = await fetch(`http://localhost:8000/unfinished/${id}/${props.difficulty}`, parameter_delete) 
            
            if (request_delete.ok){
                const request = await fetch("http://localhost:8000/unfinished", parameter)
    
                if (request.ok){
                    navigate("/main")
                }
            }
        }
        catch(error){
            console.log(error)
        }
    }

    function restart(){
        setSudokuLines(getSudokuGame(props.difficulty))
        setSeconds(0)
        setMinutes(10)
        setIsPaused(false)
        setGameStatus({finished: false, time: false})
        startTimer()
        const pause_button = document.getElementById("pause-button")
        if (pause_button.innerText !== "Pause") pause_button.innerText = "Pause"
    }

    function handleActionButton(event){
        if (isPaused) {
            setIsPaused(false)
            startTimer()
            event.target.innerText = "Pause"
        } else {
            clearInterval(timerRef.current)
            setIsPaused(true)
            event.target.innerText = "Continue"
        }
    }


    return(
        <>  
            {continueGame && <PopupContinue continue = {continueGame} restart = {restart} setContinue = {setContinueGame} minutes = {minutes} seconds = {seconds} setIsPaused = {setIsPaused}></PopupContinue>}
            {gameStatus.finished && <PopupRestart gameStatus = {gameStatus} restart = {restart} setStatus = {setGameStatus}></PopupRestart>}
            <div id="top-container">
                <button id="back-button"  className="sudoku-button" onClick={handleBackClick}>&lt;-</button>
            </div>
            <div id="game-container">
                <div id="sudoku">
                    {sudokuLines.map((values, line) => {
                        return values.map((value, column) => {
                            if (value.v > 0 && value.i !== -1) {
                                return <div className="square fixed" data-posline={line} data-poscolumn={column} key={`${line}-${column}`} value={value} 
                                onMouseOver={(e) => handleMouseOver(line, column)}
                                onMouseLeave={handleMouseLeave}>{value.v}</div>
                            }
                            return <input type="text" className="square" data-posline={line} data-poscolumn={column} maxLength="1" key={`${line}-${column}`} 
                            value={value.v > 0 && value.i === -1 ? value.v : ""}
                            onChange={(e) => handleChange(e, line, column)} 
                            onMouseOver={(e) => handleMouseOver(line, column)}
                            onMouseLeave={handleMouseLeave}/>
                        })
                    })}
                    {isPaused && <div id="lock-game"></div>}
                </div>
                <div id="configuration">
                    <div id="timer">
                        <p id="timer-value" style={{ color: `rgb(${rgb}, 0, 0)`}}>
                            {minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}
                        </p>
                    </div>
                    <div id="buttons-container">
                        <button id="pause-button" className="sudoku-button" onClick={handleActionButton}>Pause</button>
                        <button id="restart-button" className="sudoku-button" onClick={restart}>Restart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sudoku