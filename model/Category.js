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
  image: String,
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