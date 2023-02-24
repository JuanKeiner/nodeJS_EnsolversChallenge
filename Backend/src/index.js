
import app from "./app.js";
import { sequelize, createDatabase } from "./database/database.js"

async function main() {
    try {
        const res = await createDatabase();
        if(!res) throw new Error('Could not connect to database');
        await sequelize.sync({force: false});
        app.listen(4000);
        console.log("Server is listening http://localhost:4000 !");
    } catch (error) {
        console.log("Error : "+error);
    }
}

main();
