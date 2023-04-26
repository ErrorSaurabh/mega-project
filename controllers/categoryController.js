// Import the category object from the category.js module
import Category from "../model/Category.js";
import asyncHandler from "express-async-handler";
import mongoose from 'mongoose';

// Create a new category
export const createcategory = async (req, res) => {
  try {
    // Extract the name, user, and image properties from the request object
    const { name, user, image, products } = req.body;

    // Check if the name is in uppercase
    if (name !== name.toLowerCase()) {
      return res.status(400).json({ message: "Category name should be in lowercase" });
    }

    // Create a new category object using the extracted properties
    const newCategory = new Category({
      name,
      user,
      image,
      products,
    });

    // Save the category object to the database
    const savedCategory = await newCategory.save();

    // Send a response with the saved category object
    res.status(201).json(savedCategory);
  } catch (error) {
    // Handle any errors that occur during the creation of the category
    res.status(500).json({ message: error.message });
  }
};

// Get all Category 
export const getCategory = asyncHandler(async (req, res) => {
  try {
    console.log(req.params.id);
    const category = await Category.findById(req.params.id);
    // const category = await Category.findById(req.query.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// API http://localhost:1000/api/categories/read/642fc902215f8652c856cf1a


// Update a Category
export const updateCategory = asyncHandler(async (req, res) => {
  const { name, user, image, products } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name || category.name;
    category.user = user || category.user;
    category.image = image || category.image;
    category.products = products || category.products;

    const updatedCategory = await category.save();
    res.json({ message: "Category updated successfully", updatedCategory });
    res.json(updatedCategory);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
});
// API http://localhost:1000/api/categories/update/642fc8a2215f8652c856cf18

// Delete a Category

export const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const result = await Category.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// API http://localhost:1000/api/categories/delete/642fc8a2215f8652c856cf18




