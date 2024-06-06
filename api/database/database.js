const { Sequelize } = require("sequelize")
require("dotenv").config({path: "../config/.env"})

const sequelize = new Sequelize(
    process.env.DATABASE, process.env.USER, process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        port: process.env.PORT
    }
)

module.exports = sequelize