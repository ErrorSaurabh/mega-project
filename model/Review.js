
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Review must belong to user"]
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, "Review must belong to product"]
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: [true, "Please add a ratting between 1 to 5"],
    min: 1,
    max: 5,
  },
});

// complete schema to model
const Review = mongoose.model('Review', reviewSchema); // register the model

export default Review;