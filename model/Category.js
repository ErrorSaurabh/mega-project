import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  image: {
    type: String,
    default: "http://via.placeholder.com/150",
    required: true,
},
  products: [{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }],
},
{
    timestamps:true
}
);

export const Category = mongoose.model("Category", categorySchema);

export default Category;