const { Client } = require("pg")
require("dotenv").config()

async function createDatabase(){
    const client = new Client({
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.USER,
        password: process.env.PASSWORD
    })

    try{
        await client.connect()
        const res = await client.query("select 1 from pg_database where datname='sudoku'");
    
        if (res.rowCount === 0) {
            await client.query('create database sudoku');
            console.log("Database 'sudoku' created");
        } else {
            console.log("Database sudoku already exists");
        }
    } 
    catch (error){
        console.error(error);
    } 
    finally{
        await client.end();
    }
}

module.exports = createDatabase