const Sequelize = require("sequelize")
const dabatase = require("../database")
const Finished = require("./Finished")
const Unfinished = require("./Unfinished")


const User = dabatase.define("user", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [4, 32],
            notEmpty: true
        }
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [4, 32]
        }
    }
})

User.hasMany(Finished, {foreignKey: 'id_p'})
Finished.belongsTo(User, {foreignKey: 'id_p'})

User.hasMany(Unfinished, {foreignKey: 'id_p'})
Unfinished.belongsTo(User, {foreignKey: 'id_p'})

module.exports = User