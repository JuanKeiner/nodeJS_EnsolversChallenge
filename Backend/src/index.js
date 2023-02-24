import app from "./app.js";
import { sequelize } from "./database/database.js"

async function main() {
    try {
        await sequelize.sync({force: false});
        app.listen(4000);
        console.log("Anda todo");
    } catch (error) {
        console.log("No anda nada: "+error);
    }
}

main();