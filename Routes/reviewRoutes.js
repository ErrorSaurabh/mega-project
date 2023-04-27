import express from "express";
import { createReview } from "../controllers/reviewController.js"

const router = express.Router(); 

// CREATE: POST request to create a new review
router.post('/create', createReview);

export default router;