function PopupContinue(props){
    return(
        <>
            <div id="popup">
                <div id="option">
                    <div id="message">
                        <p id="message">
                            {`You have a game at
                            ${props.minutes < 10 ? "0" + props.minutes: props.minutes}:${props.seconds < 10 ? "0" + props.seconds : props.seconds} want to continue?`}
                        </p>
                    </div>
                    <div id="container-game-button">
                        <button onClick={() => { 
                            props.setContinue(false)
                            props.setIsPaused(false)
                        }}>Continue</button>
                        <button onClick={() => {
                            props.restart()
                            props.setContinue(false)
                        }}>New game</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopupContinue