import Product from "../model/Product.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const createProduct = asyncHandler(async (req, res) => {
  const {} = req.body;
  // Do something with the request body
  
  // Create a new product object and save it to the database
  const product = new Product({ /* add properties here */ });
  await product.save();

  const response = { message: 'Product created successfully' };
  res.status(201).json(response);
});
