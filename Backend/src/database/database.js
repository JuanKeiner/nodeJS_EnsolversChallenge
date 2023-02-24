import Sequelize from 'sequelize'
import promptSync from 'prompt-sync';
import pg from "pg";
const { Client } = pg;

const prompt = promptSync();

//db credentials
let dbUserName;
let dbUserPass;

databaseCredentialsInput();

// create a new pool object to manage connections to the database
const client = new Client({
    host: 'localhost',
    user: dbUserName,
    password: dbUserPass,
    port: 5432,
});

export const createDatabase = async () => {
    try {
        await client.connect();                            // gets connection
        await client.query('CREATE DATABASE ' + "notesdatabase");
        console.log("Creada");
        return true;
    } catch (error) {
        if(error.code = "42P04") return true;
        console.log(error);
        return false;
    } finally {
        await client.end();                                // closes connection
    }
};



export const sequelize = new Sequelize("notesdatabase", client.user, client.password, {
    host: "localhost",
    port: client.port,
    dialect: "postgres"
})

function databaseCredentialsInput(){

    dbUserName = prompt('Database owner name (default: postgres): ');
    if(dbUserName=="") dbUserName = "postgres";
    do {
        dbUserPass = prompt('User password: ');
    } while (dbUserPass=="");

}