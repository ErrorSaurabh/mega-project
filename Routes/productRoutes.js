import express from "express";
import { 
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct 
    } from "../controllers/productController.js";
import isLogin from "../middleware/IsLogin.js";

const router = express.Router(); // Capital "R" in "Router"

// CREATE: POST request to create a new brand
router.post('/create', isLogin, createProduct);

// READ: GET request to get all brands
router.get("/read", getProducts);

// READ: GET request to get a product by ID
router.get("/read/:id", getProductById);

// UPDATE: PUT request to update a product by ID
router.put("/update/:id", isLogin, updateProduct);

// DELETE: DELETE request to delete a product by ID
router.delete("/delete/:id", isLogin, deleteProduct);

export default router;


