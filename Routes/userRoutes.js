import express from "express";
import { Login, Register } from "../controllers/UserController.js";

const userRoutes = express.Router()

userRoutes.post('/register', Register)
userRoutes.post('/login', Login)

export default userRoutes;
