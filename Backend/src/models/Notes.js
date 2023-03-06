import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

//Note table
export const Note = sequelize.define("notes",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING
    },
    text:{
        type: DataTypes.STRING(1234)
    },
    archived:{
        type: DataTypes.BOOLEAN
    }

})

