// Import the Brand model from the brand.js module
import { Brand } from "../model/Brand.js";

// Create a new brand
export const createBrand = async (req, res) => {
  try {
    // Extract the name, user, and image properties from the request object
    const { name, user, products } = req.body;

    // Create a new brand object using the extracted properties
    const newBrand = new Brand({
      name,
      user,
      products,
    });

    // Save the brand object to the database
    const savedBrand = await newBrand.save();

    // Send a response with the saved brand object
    res.status(201).json(savedBrand);
  } catch (error) {
    // Handle any errors that occur during the creation of the brand
    res.status(500).json({ message: error.message });
  }
};

export default createBrand;

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params?.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    await brand.remove();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

