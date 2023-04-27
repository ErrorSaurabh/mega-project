// Import the review object from the review.js module
// import Review from '../model/Review.js';

// export const createReview = async (req, res) => {
//   try {
//     const { user, product, text, rating } = req.body;
//     const review = await Review.create({ user, product, text, rating });
//     res.status(201).json({ success: true, review });
//   } 
//   catch (error) {
//     console.log(error);
//     res.status(400).json({ success: false, message: 'Unable to create review' });
//   }
// };

import Review from '../model/Review.js';

export const createReview = async (req, res) => {
  try {
    const { user, product, text, rating } = req.body;
    const existingReview = await Review.findOne({ user, product });
    if (existingReview) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this product' });
    }
    const review = await Review.create({ user, product, text, rating });
    res.status(201).json({ success: true, message: 'Review created successfully', review });
  } 
  catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: 'Unable to create review' });
  }
};



