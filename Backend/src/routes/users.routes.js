
//Not in use, user login system not working


import { Router } from "express";
import { login } from "../controllers/users.controller.js";

const router = Router();
router.put("/login", login);

export default router;