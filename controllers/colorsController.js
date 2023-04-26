// Import the Color model from the color.js module
import Color from "../model/Color.js";
import asyncHandler from "express-async-handler";

// Create a new color
export const createColor = async (req, res) => {
  try {
    // Extract the name and user properties from the request object
    const { name, user } = req.body;

    // Create a new color object using the extracted properties
    const newColor = new Color({
      name,
      user,
    });

    // Save the color object to the database
    const savedColor = await newColor.save();

    // Send a response with the saved color object and a success message
    res.status(201).json({ message: "Color created successfully", color: savedColor });
  } catch (error) {
    // Handle any errors that occur during the creation of the color
    res.status(500).json({ message: error.message });
  }
};
// API http://localhost:1000/api/colors/create


// Get a single color by ID
export const getColorById = async (req, res) => {
  try {
    // Find the color with the specified ID in the database
    const color = await Color.findById(req.params.id);

    // If the color is not found, return an error response
    if (!color) {
      return res.status(404).json({ message: "Color not found" });
    }

    // Send a response with the color object
    res.status(200).json(color);
  } catch (error) {
    // Handle any errors that occur during the retrieval of the color
    res.status(500).json({ message: error.message });
  }
};
// API http://localhost:1000/api/colors/read/6447aaeb73a400bb54901b99

// Update a color by ID
export const updateColor = async (req, res) => {
  try {
    // Find the color with the specified ID in the database
    const color = await Color.findById(req.params.id);

    // If the color is not found, return an error response
    if (!color) {
      return res.status(404).json({ message: "Color not found" });
    }

    // Update the color object with the new properties
    color.name = req.body.name || color.name;
    color.user = req.body.user || color.user;

    // Save the updated color object to the database
    const updatedColor = await color.save();

    // Send a response with the updated color object
    res.status(200).json(updatedColor);
  } catch (error) {
    // Handle any errors that occur during the update of the color
    res.status(500).json({ message: error.message });
  }
};
// API http://localhost:1000/api/colors/update/6447a565439b586e704e3afb

// Delete a color by ID
export const deleteColor = asyncHandler(async (req, res) => {
  try {
    const result = await Color.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Color deleted successfully" });
    } else {
      res.status(404).json({ message: "Color not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// API http://localhost:1000/api/colors/delete/6447a565439b586e704e3afb
  
