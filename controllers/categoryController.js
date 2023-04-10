// Import the category object from the category.js module
import Category from "../model/Category.js";

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
