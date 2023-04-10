// Import the Color model from the color.js module
import Color from "../model/Color.js";
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

    // Send a response with the saved color object
    res.status(201).json(savedColor);
  } catch (error) {
    // Handle any errors that occur during the creation of the color
    res.status(500).json({ message: error.message });
  }
};

// Get all colors
export const getColors = async (req, res) => {
  try {
    // Find all colors in the database
    const colors = await Color.find({});

    // Send a response with the colors array
    res.status(200).json(colors);
  } catch (error) {
    // Handle any errors that occur during the retrieval of the colors
    res.status(500).json({ message: error.message });
  }
};

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

// Delete a color by ID
export const deleteColor = async (req, res) => {
    try {
      // Find the color with the specified ID in the database
      const color = await Color.findById(req.params.id);
  
      // If the color is not found, return an error response
      if (!color) {
        return res.status(404).json({ message: "Color not found" });
      }
  
      // Remove the color object from the database
      await color.remove();
  
      // Send a response with a success message
      res.status(200).json({ message: "Color deleted successfully" });
    } catch (error) {
      // Handle any errors that occur during the deletion of the color
      res.status(500).json({ message: error.message });
    }
  };
  
