import Sudoku from "./Sudoku.jsx"

function Container(props){
    return(
        <>
            <div id="container">
                <Sudoku difficulty = {props.difficulty} minutes = {props.minutes} seconds = {props.seconds}></Sudoku>
            </div>
        </>
    )
}

export default Container