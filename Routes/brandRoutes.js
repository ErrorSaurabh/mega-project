import express from 'express';
import createBrand from '../controllers/brandController.js';

const router = express.Router();

// Define a route for creating a new brand
router.post('/create', createBrand);

export default router;
