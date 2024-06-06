const sequelize = require("./database")

async function syncDatabase(){
    try{
        await sequelize.sync({force: false})
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = syncDatabase