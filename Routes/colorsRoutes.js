import express from "express";
import {
  createColor,
  getColorById,
  updateColor,
  deleteColor,
} from "../controllers/colorsController.js";

const router = express.Router();

// CREATE: POST request to create a new color
router.post("/create", createColor);

// READ: GET request to get a color by ID
router.get("/read/:id", getColorById);

// UPDATE: PUT request to update a color by ID
router.put("/update/:id", updateColor);

// DELETE: DELETE request to delete a color by ID
router.delete("/delete/:id", deleteColor);

export default router;

