// Import the category object from the category.js module
import { category } from "../models/category.js";

// Create a new category
export const createcategory = async (req, res) => {
  try {
    // Extract the name, user, and image properties from the request object
    const { name, user, image } = req.body;

    // Create a new category object using the extracted properties
    const newCategory = new category({
      name,
      user,
      image,
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