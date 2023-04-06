import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name:{
    type: String
  },

  price: {
    type:Number
  },

  description: {
    type:String
  },

  brand: {
    type:String
  },

  category: {
    type:String
  },

  sizes: [String],

  color: {
    type:String
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  images: [{
    type:String,
    default:"https://via.placeholder.com/150"
  }],
  reviews: [{
    type : mongoose.Schema.Types.ObjectId,
    ref: "review"
  }],

  price: {
    type:Number
  },

  totalQuantity: {
    type:Number
  },

  totalSold: {
    type:Number
  },
},
{
  timestamps:true
}
);

export const Product = mongoose.model("Product", productSchema);
