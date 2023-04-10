import express from "express";
import {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";

const router = express.Router();

// CREATE: POST request to create a new brand
router.post("/create", createBrand);

// READ: GET request to get all brands
router.get("/read", getBrands);

// READ: GET request to get a brand by ID
router.get("/read/:id", getBrandById);

// UPDATE: PUT request to update a brand by ID
router.put("/update/:id", updateBrand);

// DELETE: DELETE request to delete a brand by ID
router.delete("/delete/:id", deleteBrand);

export default router;

