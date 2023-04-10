// Import the product object from the product.js module
import { Product } from "../model/Product.js";

import asyncHandler from "express-async-handler";
import jwt  from "jsonwebtoken";

export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description } = req.body; // Destructure the request body to get the product details
  const product = await Product.create({
    name,
    price,
    description
  })
  return res.status(201).json({
    msg: "Product created successfully",
    data: product
    // token
  })

});
export const product = (req, res) => {
  
    const response = { message: 'Product created successfully' };
  res.status(201).json(response);
};

// Get all products
export const getProducts = asyncHandler(async (req, res) => {
  try {
    // Find all products in the database
    const products = await Product.find({});

    // Send a response with the products array
    res.status(200).json(products);
  } catch (error) {
    // Handle any errors that occur during the retrieval of the products
    res.status(500).json({ message: error.message });
  }
});
// const token = req.headers.authorization.split(" ")[1];
  // if (!token) {
  //   return res.status(401).json({ message: 'No token provided' });
  // }
  // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    
  //   if (err) {
  //     return res.status(401).json({ message: 'Invalid token' });
  //   }else{
  //     console.log(decoded)
  //     req.userId = decoded.userId;
  //   }

  // });
