import mongoose from "mongoose";

const Schema = mongoose.Schema; // Capital "S" in "Schema"

const productSchema = new Schema({ // Capital "S" in "Schema"
  name: String, // Capital "S" in "String"
  price: Number, // Lowercase "n" in "Number"
  description: String, // Capital "S" in "String"
});

export const Product = mongoose.model('Product', productSchema); // Capital "P" in "Product"