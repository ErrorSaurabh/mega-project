// Import the product object from the product.js module
import asyncHandler from "express-async-handler";
import { Product } from "../model/Product.js";

// Create a new product
export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, brand, category, sizes, color, images, reviews, totalQuantity, totalSold} = req.body;
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
    totalSold
  });
  return res.status(201).json({
    msg: "Product created successfully",
    data: product,
    // token
  });
});

// export const getProducts = asyncHandler(async (req, res) => {
//   try {
//     const nameFilter = req.query.name ? { name: { $regex: req.query.name, $options: 'i' } } : {};
//     const products = await Product.find(nameFilter);

//     if (products.length === 0) {
//       return res.status(404).json({ message: 'No data found' });
//     }

//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Get all products with optional name filter
export const getProducts = asyncHandler(async (req, res) => {
  try {
    const { name, brand, color, size } = req.query;

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const brandFilter = brand ? { brand: { $regex: brand, $options: 'i' } } : {};
    const colorFilter = color ? { color: { $regex: color, $options: 'i' } } : {};
    const sizeFilter = size ? { size: { $regex: size, $options: 'i' } } : {};

    const products = await Product.find({
      ...nameFilter,
      ...brandFilter,
      ...colorFilter,
      ...sizeFilter,
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Get a product by id
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Update a product
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;

    const updatedProduct = await product.save();
    res.status(200).json({
      msg: "Product updated successfully",
      data: updatedProduct,
    });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Delete a product
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.status(200).json({ message: "Product deleted successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});
