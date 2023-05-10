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
  
// reviews: { 
//   type:String
// },

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

productSchema.virtual("totalReviews").get(function(){
  const product = this;
  return product?.reviews?.length;
})
// Define a virtual property for average rating
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

export const Product = mongoose.model("Product", productSchema);
