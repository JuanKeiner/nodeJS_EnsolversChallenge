import Sequelize from 'sequelize'
import promptSync from 'prompt-sync'; 

const prompt = promptSync();

const DbName = prompt('Database name: ');
const DbUserName = prompt('Database owner name: ');
const DbUserPass = prompt('Database password: ');
export const sequelize = new Sequelize(DbName, DbUserName, DbUserPass, {
    host: "localhost",
    dialect: "postgres"
})