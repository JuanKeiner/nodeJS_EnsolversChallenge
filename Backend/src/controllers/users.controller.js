import { Note } from "../models/Notes.js"
import { User } from "../models/Users.js"


//Not in use, user login system not working
export const login = async (req, res) => {

    const data = req.body;
    try {
        const userName = data.name;
        const userpassword = data.password;
        const userToLogin = await User.findOne({ where: { name: userName } });
        if (userToLogin == null) {
            res.status(404).json({
                message: "User doesn't exists"
            })
        } else if (userToLogin.password != userpassword) {
            res.status(404).json({
                message: "Incorrect password"
            })
        } else {
            // User.logged = userToLogin.id;
            console.log("User logged: "+userToLogin.id);
            res.status(204).json({
                message: "Logged"
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}