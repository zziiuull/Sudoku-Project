const jwt = require("jsonwebtoken")
const fs = require("fs")

function verifyJWT(req, res, next){
    const header = req.headers["authorization"]

    if (!header){
        return res.status(401).json({
            message: "Wrong header format"
        })
    }

    const token = header.split(" ")[1]
    
    if (!token) return res.status(401).json({
        message: "Wrong token format"
    })

    const public_key = fs.readFileSync("./keys/public.key", "utf8")
    jwt.verify(
        token, 
        public_key, 
        {algorithm: "RS256"}, 
        (error, decoded) => {
            if (error){
                return res.status(401).json({
                    message: "Invalid token"
                })
            }
            return next()
        }
    )
}


module.exports = { verifyJWT }