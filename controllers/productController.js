// Import the product object from the product.js module
import asyncHandler from "express-async-handler";
import { Product } from "../model/Product.js";
import mongoose from 'mongoose';


// Create a new product
export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, brand, category, sizes, color, images, reviews, totalQuantity, totalSold, user} = req.body;
  const product = await Product.create({
    name,
    price,
    description,
    brand,
    category,
    sizes,
    color,
    images,
    reviews,
    totalQuantity,
    totalSold,
    user: new mongoose.Types.ObjectId(user)

  });
  return res.status(201).json({
    msg: "Product created successfully",
    data: product,
    // token
  });
});
// API
// http://localhost:1000/api/products/create
// Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjQxZWExZTBlYjY2Mzk2YzljYWY3YyIsImlhdCI6MTY4MDI2MTgyMiwiZXhwIjoxNjgyODUzODIyfQ.Q5IPZDtpfwvbgzgEc4IqQra_fhDkZlwrUUhROZ-dZQ8

// Get all products with optional name filter
export const getProducts = asyncHandler(async (req, res) => {
  try {
    const { name, brand, color, size, priceRange, page, limit } = req.query;

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const brandFilter = brand ? { brand: { $regex: brand, $options: 'i' } } : {};
    const colorFilter = color ? { color: { $regex: color, $options: 'i' } } : {};
    const sizeFilter = size ? { size: { $regex: size, $options: 'i' } } : {};

    let priceFilter = {};
    if (priceRange) {
      const priceRanges = priceRange.split("-");
      const minPrice = parseInt(priceRanges[0]);
      const maxPrice = parseInt(priceRanges[1]);
      priceFilter = { price: { $gte: minPrice, $lte: maxPrice } };
    }

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 5;

    const skip = (pageNumber - 1) * limitNumber;

    const products = await Product.find({
      ...nameFilter,
      ...brandFilter,
      ...colorFilter,
      ...sizeFilter,
      ...priceFilter,
    })
      .skip(skip)
      .limit(limitNumber);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// http://localhost:1000/api/products/read?name=z
// http://localhost:1000/api/products/read?brand=a
// http://localhost:1000/api/products/read?priceRange=500-1000
// http://localhost:1000/api/products/read?name=shirt&brand=nike&color=blue&size=medium&minPrice=500&maxPrice=1000
// http://localhost:1000/api/products/read?page=3&limit=5
// http://localhost:1000/api/products/update/642d5f8cd1b483619f9a4183

// Get a product by id
export const getProductById = asyncHandler(async (req, res) => {

const product = await Product.findById(req.params.id)

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
}); 
// API
// http://localhost:1000/api/products/read/64352e7d3ac89b229cb4d7e5


// Update a product by id and user id authentication
export const updateProduct = asyncHandler(async (req, res) => {
  const { id, userId } = req.params;
  const { name, price, description, brand, category, sizes, color, images, reviews, totalQuantity, totalSold } = req.body;

  // Check if the product exists
  const product = await Product.findOne({ _id: id, user: userId });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Update the product
  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.sizes = sizes || product.sizes;
  product.color = color || product.color;
  product.images = images || product.images;
  product.reviews = reviews || product.reviews;
  product.totalQuantity = totalQuantity || product.totalQuantity;
  product.totalSold = totalSold || product.totalSold;
  const updatedProduct = await product.save();

  return res.json({
    msg: "Product updated successfully",
    data: updatedProduct,
  });
});
// API
// http://localhost:1000/api/products/update/642d5f6cf9b48df64306a997
// Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjQxZWExZTBlYjY2Mzk2YzljYWY3YyIsImlhdCI6MTY4MDI2MTgyMiwiZXhwIjoxNjgyODUzODIyfQ.Q5IPZDtpfwvbgzgEc4IqQra_fhDkZlwrUUhROZ-dZQ8



// Delete a product
export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.deleteOne({ _id: req.params.id });
    if (product.deletedCount === 1) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
// API
// http://localhost:1000/api/products/delete/642d5f6cf9b48df64306a997
//  
