import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  
},
{
    timestamps:true
}
);
// Complete Schema to model
const Color = mongoose.model('color', colorSchema);

export default Color;
