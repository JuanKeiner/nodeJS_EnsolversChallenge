
import app from "./app.js";
import { sequelize, createDatabase } from "./database/database.js"

async function main() {
    try {
        //Creates the PostgreSQL database
        const res = await createDatabase();
        if(!res) throw new Error('Could not connect to database');

        //Creates the Sequelize ORM
        await sequelize.sync({force: false});

        app.listen(4000);

        //App started succesfully
        console.log("Server is listening http://localhost:4000 !");

    } catch (error) {
        //Error when starting the application
        console.log("Error : "+error);
    }
}

main();
