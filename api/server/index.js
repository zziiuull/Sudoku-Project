const express = require("express")
const body_parser = require("body-parser")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const { verifyJWT } = require("./middlewares/jwt")

const createDatabase = require("../database/createDatabase")
const syncDatabase = require("../database/syncDatabase")

const { insertUser, insertUnfinished,  insertFinished,
        searchtUser, searchUnfinished, searchFinished,
        getRank, deleteUnfinished } = require("../database/persistence")

const port = 8000

const app = express()

async function startDatabase(){
    await createDatabase()
    await syncDatabase()
} startDatabase()

app.use(cors())

app.post("/login", [body_parser.json(), async (req, res, next) => {
    if (!req.body) {
        res.status(400).json(
            {
                message: "Missing required user information"
            }
        )
    }

    const email = req.body.email
    const password = req.body.password
    
    try{
        const user = await searchtUser(email, password)
        if (user === null){
            res.status(401).json(
                {
                    message: "Invalid credentials"
                }
            )
        }
        else{
            const private_key = fs.readFileSync("./keys/private.key", "utf8")
            
            const token = jwt.sign(
                {email}, 
                private_key, 
                {
                    algorithm: "RS256",
                    expiresIn: 900
                }
            )
            
            res.status(200).json(
                {
                    message: "Authenticated",
                    token: token,
                    name: user.name,
                    email: user.email,
                    id: user.id
                }
            )
        }
    }
    catch (error){
        console.log(error)
    }
}])

app.post("/register", [body_parser.json(), async (req, res, next) => {
    if (!req.body) {
        res.status(400).json(
            {
                message: "Missing required user information"
            }
        )
    }

    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    try{
        const user = await insertUser(username, email, password)
        console.log(user)
        if (user === undefined){
            res.status(401).json(
                {
                    message: "Invalid credentials"
                }
            )
        }
        else{
            res.status(200).json(
                {
                    message: "User registered"
                }
            )
        }
        
    }
    catch (error){
        console.log(error)
    }

}])

app.use(verifyJWT)

app.post("/unfinished", [body_parser.json(), async(req, res, next) => {
    if (!req.body){
        res.status(400).json(
            {
                message: "Missing required game information"
            }
        )
    }

    try{
        const unfinished = await insertUnfinished(req.body)
        console.log(unfinished)
        if (unfinished === undefined){
            res.status(404).json(
                {
                    message: "Invalid game credentials"
                }
            )
        }
        else{
            res.status(200).json(
                {
                    message: "Unfinished game registered"
                }
            )
        }
        
    }
    catch (error){
        console.log(error)
    }
}])

app.get("/unfinished/:id/:difficulty", async(req, res, next) => {
    if (!req.params.id ||
        !req.params.difficulty){
        res.status(400).json(
            {
                message: "Missing required game information"
            }
        )
    }

    try{
        const unfinished = await searchUnfinished(req.params.id, req.params.difficulty)
        if (unfinished === null){
            res.status(404).json(
                {
                    message: "Invalid game credentials"
                }
            )
        }
        else{
            res.status(200).json(
                {
                    board: unfinished.dataValues.board,
                    minutes: unfinished.dataValues.minutes,
                    seconds: unfinished.dataValues.seconds
                }
            )
        }
        
    }
    catch (error){
        console.log(error)
    }
})

app.delete("/unfinished/:id/:difficulty", async(req, res, next) => {
    if (!req.params.id ||
        !req.params.difficulty) {
        res.status(400).json(
            {
                message: "Missing required game information"
            }
        )   
    }

    try{
        const unfinished = await deleteUnfinished(req.params.id, req.params.difficulty)
        if (unfinished === undefined){
            res.status(404).json(
                {
                    message: "Invalid game credentials"
                }
            )
        }
        else{
            res.status(200).json(
                {
                    message: "Game deleted with success"
                }
            )
        }
        
    }
    catch (error){
        console.log(error)
    }

})

app.post("/finished", [body_parser.json(), async(req, res, next) => {
    if (!req.body) {
        res.status(400).json({
            message: "Missing required game information"
        })
    }

    try{
        const finished = await insertFinished(req.body)
    
        if (finished === undefined){
            res.status(404).json(
                {
                    message: "Invalid game credentials"
                }
            )
        }
        else{
            res.status(200).json(
                {
                    message: "Finished game registered"
                }
            )
        }
        
    }
    catch (error){
        console.log(error)
    }
}])

app.get("/finished/:id/:difficulty", async (req, res, next) => {
    if (!req.params.id ||
        !req.params.difficulty) {
        res.status(400).json(
            {
                message: "Missing required game information"
            }
        )
    }

    try{
        const finished = await searchFinished(req.params.id, req.params.difficulty)
        if (finished === null){
            res.status(404).json(
                {
                    message: "Invalid game credentials"
                }
            )
        }
        else{
            res.status(200).json(
                {
                    data: finished
                }
            )
        }
    }
    catch (error){
        console.log(error)
    }

})

app.get("/rank/:difficulty", async (req, res, next) => {
    if (!req.params.difficulty) {
        res.status(400).json({
            message: "Missing required rank information"
        })
    }

    try{
        const rank = await getRank(req.params.difficulty)
        if (rank === null){
            res.status(404).json(
                {
                    message: "No games were found"
                }
            )
        }
        else{
            res.status(200).json(
                {
                    data: rank
                }
            )
        }
    }
    catch (error){
        console.log(error)
    }
})

app.get("/play", (req, res, next) => {
    res.status(200).json(
        {
            message: "Authenticated"
        }
    )
})

app.listen(port, () => console.log("server running"))