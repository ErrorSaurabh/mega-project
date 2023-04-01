import express from "express";
import { product } from "../controllers/productController.js";

const router = express.Router(); // Capital "R" in "Router"
router.post('/create', product);

export default router;


