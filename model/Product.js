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

// Define a virtual property for average rating
productSchema.virtual('averageRating').get(function() {
  if (this.reviews.length === 0) {
    return 0;
  }
  const sum = this.reviews.reduce((total, review) => {
    return total + review.rating;
  }, 0);
  return Math.round((sum / this.reviews.length) * 10) / 10; // round to one decimal point
});

export const Product = mongoose.model("Product", productSchema);
