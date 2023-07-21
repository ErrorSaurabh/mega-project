
// Import the Brand model from the brand.js module
import { Brand } from "../model/Brand.js";
import asyncHandler from "express-async-handler";
// Create a new brand
export const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Check if the brand already exists
  const brandExists = await Brand.findOne({ name });
  if (brandExists) {
    throw new Error('Brand Already Exists');
  }

  // Create the brand
  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.useAuthId,
  });

  res.json({
    status: 'success',
    message: "Brand Created Successfully",
    data: brand,
  });
});

export default createBrand;

// get a brand
export const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params?.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// API http://localhost:1000/api/brand/read/64352e5f3ac89b229cb4d7e2

// Update Brand
export const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params?.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    brand.name = req.body.name || brand.name;
    brand.user = req.body.user || brand.user;
    brand.products = req.body.products || brand.products;
    const updatedBrand = await brand.save();
    res.json({ message: "Brand updated successfully", updatedBrand });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// API http://localhost:1000/api/brand/update/64352e5f3ac89b229cb4d7e2

// Delete Brand
export const deleteBrand = asyncHandler(async (req, res) => {
  try {
    const result = await Brand.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Brand deleted successfully" });
    } else {
      res.status(404).json({ message: "Brand not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// API http://localhost:1000/api/brand/delete/64352e5f3ac89b229cb4d7e2


