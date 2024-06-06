function handleKeyPress(e, handler){
    if (e.key === "Enter")
        handler()
}

function handleUserData(e, data, setData){
    setData(() => ({
        ...data,
        [e.target.name]: e.target.value
    }))
}


export { handleKeyPress, handleUserData }