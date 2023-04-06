import express from "express";
import { createProduct } from "../controllers/productController.js";
import isLogin from "../middleware/IsLogin.js";

const router = express.Router(); // Capital "R" in "Router"
router.post('/create', isLogin, createProduct);

export default router;


