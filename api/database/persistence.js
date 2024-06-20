const bcrypt = require("bcrypt")
const User = require("./models/User")
const Finished = require("./models/Finished")
const Unfinished = require("./models/Unfinished")

async function insertUser(name, email, password){
    try{
        const user = await User.create({
            name: name,
            email: email,
            password: password
        })
        return user
    }
    catch (error){
        console.log(error.message)
    }
}

async function insertUnfinished(body){
    try{
        const unfinished = await Unfinished.create({
            id_p: body.id_p,
            difficulty: body.difficulty,
            board: body.board,
            minutes: body.minutes,
            seconds: body.seconds
        })
        return unfinished
    }
    catch (error){
        console.log(error.message)
    }
}
async function deleteUnfinished(id_p, difficulty){
    try{
        
        const unfinished = await Unfinished.destroy({
            where: {
                id_p: id_p,
                difficulty: difficulty
            }
        })
        return unfinished
    }
    catch (error){
        console.log(error.message)
    }
}

async function insertFinished(body){
    try{
        const finished = await Finished.create({
            id_p: body.id_p,
            difficulty: body.difficulty,
            minutes: body.minutes,
            seconds: body.seconds
            
        })
        return finished
    }
    catch (error){
        console.log(error.message)
    }
}

async function searchtUser(email, password){
    try{
        const user = await User.findOne(
            {
                where:{
                    email: email
                }
            }
        )

        if (!user) return null
        console.log(user.password)
        const isValid = await bcrypt.compare(password, user.password)
        if (isValid) return user 
        
        return null
    }
    catch (error){
        console.log(error)
    }
}

async function searchUnfinished(id_p, difficulty){
    try{
        const unfinished = await Unfinished.findOne(
            {
                where:{
                    id_p: id_p,
                    difficulty: difficulty
                }
            }
        )
        return unfinished 
    }
    catch (error){
        console.log(error)
    }
}

async function searchFinished(id_p, difficulty){
    try{
        const finished = await Finished.findAll(
            {
                where:{
                    id_p: id_p,
                    difficulty: difficulty
                }
            }
        )
        return finished 
    }
    catch (error){
        console.log(error)
    }
}

async function getRank(difficulty){
    try{
        const finished = await Finished.findAll(
            {
                where:{
                    difficulty: difficulty
                },
                include: [{model: User, attributes: ['name']}],
                order: [['minutes', 'ASC'], ['seconds', 'ASC']],
                limit: 10
            }
        )
        return finished 
    }
    catch (error){
        console.log(error)
    }
}

module.exports = { 
                    insertUser, insertUnfinished, insertFinished, 
                    searchtUser, searchUnfinished, searchFinished,
                    getRank, deleteUnfinished 
                }