import { Schema, model } from "mongoose";
import { imageSchema } from "./image.js";
import { categorySchema } from "./category.js";

const ItemSchema = new Schema({
  images: { type: [imageSchema], required: true }, // Array of image objects
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: [categorySchema], required: true },
  subCategory: { type: String, required: true },
  sizes: { type: [String], required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default model("Item", ItemSchema);
