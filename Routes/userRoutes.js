import express from "express";
import { Login, Register, updateShippingAddress } from "../controllers/UserController.js";
import isLogin from "../middleware/IsLogin.js";
const userRoutes = express.Router()

userRoutes.post('/register', Register)
userRoutes.post('/login', Login)
// userRoutes.get('/profile', getProfile)
userRoutes.post('/updateShipping', isLogin, updateShippingAddress)

export default userRoutes;
