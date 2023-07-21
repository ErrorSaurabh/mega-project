import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name:{
    type: String,
    required: true
  },

  description: {
    type:String,
    required: true
  },

  brand: {
    type:String
  },

  category: {
    type:String
  },

  sizes: {
    type:[String],  // array of strings to store the different size available for this item
    enum: ["s", "M", "L", "XL", "XXL"],
    required: true
  },

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

// Virtuals

// Qty Left
productSchema.virtual("totalReviews").get(function(){
  const product = this;
  return product?.reviews?.length;
})
// Define a virtual property for average rating

// Avg ratting
productSchema.virtual('averageRating').get(function() {
let rattingsTotal  = 0;
const product = this;
product?.reviews?.forEach((review)=>{
  rattingsTotal += review?.rating;
})  
// calculate avg rating
const avgRating = Number(rattingsTotal / product?.reviews?.length).toFixed(1);
return avgRating;
});

// complete Schema to model
export const Product = mongoose.model("Product", productSchema);
