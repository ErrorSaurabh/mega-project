import express from "express";
import dotenv from "dotenv";
import connect from "./config/database.js";
import bcrypt from "bcryptjs";
import userRoutes from "./Routes/userRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import { errorHandler } from "./middleware/ErrorHandler.js";

// Initialize app
const app = express();

// Load environment variables
dotenv.config();

// Connect to database
connect();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;