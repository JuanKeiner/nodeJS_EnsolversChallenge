import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

import { Note } from "../models/Notes.js"

// let logged = null;

//User table
export const User = sequelize.define("users",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING(1234)
    }

})

//Create an admin user to test the app, users not working for now
User.create({
    name: "admin",
    password: "admin"
})


//Relationship of the user with his notes in the database
User.hasMany(Note,{
    foreignKey: "userId",
    sourceKey: "id"
})

Note.belongsTo(User,{
    foreignKey: "userId",
    targetId: "id"
})