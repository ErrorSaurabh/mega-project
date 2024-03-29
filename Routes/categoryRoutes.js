import express from 'express';
import { createcategory, getCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import isLogin from "../middleware/IsLogin.js";
const router = express.Router();

// Define a route for creating a new category
router.post('/create', createcategory);

// READ: GET request to get all Category
router.get("/read/:id", getCategory);

// UPDATE: PUT request to update a Category by ID
router.put("/update/:id", isLogin, updateCategory);

// DELETE: DELETE request to delete a Category by ID
router.delete("/delete/:id", isLogin, deleteCategory);

export default router;
