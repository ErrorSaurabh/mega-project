// Import the review object from the review.js module
import Review from '../models/review.js';

export const createReview = async (req, res) => {
  try {
    const { user, product, text, rating } = req.body;
    const review = await Review.create({ user, product, text, rating });
    res.status(201).json({ success: true, review });
  } 
  catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: 'Unable to create review' });
  }
};



