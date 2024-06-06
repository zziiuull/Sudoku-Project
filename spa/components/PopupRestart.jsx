import React from "react"

function PopupRestart(props){
    function getPopupMessage(){
        if (props.gameStatus.time){
            return <div id="center-message"><p>Game time is over</p></div>
        }
        if (props.gameStatus){
            return <div id="center-message"><p>Congratulations!</p> <p>You completed the game</p></div>
        }
    }

    return(
        <>
            <div id="popup">
                <div id="option">
                    <div id="message">
                        {getPopupMessage()}
                    </div>
                    <div id="container-game-button">
                        <button onClick={props.restart}>New game</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopupRestart