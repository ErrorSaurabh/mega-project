import express from "express";
import { product } from "../controllers/UserController.js";

const product = express.Router()

userRoutes.post('/product/create', product)


export default product;