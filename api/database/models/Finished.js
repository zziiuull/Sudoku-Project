const Sequelize = require("sequelize")
const database = require("../database")
const User = require("./User")

const Finished = database.define("finished", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_p: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    difficulty: {
        type: Sequelize.STRING,
        allowNull: false
    },
    minutes: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    seconds: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Finished