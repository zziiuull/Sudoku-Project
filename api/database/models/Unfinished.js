const Sequelize = require("sequelize")
const database = require("../database")

const Unfinished = database.define("unfinished", {
    id_p: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    difficulty: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    board: {
        type: Sequelize.JSON,
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

module.exports = Unfinished