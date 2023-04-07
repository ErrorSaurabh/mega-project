import express from 'express';
import { createcategory } from '../controllers/categoryController.js';

const router = express.Router();

// Define a route for creating a new category
router.post('/create', createcategory);

export default router;