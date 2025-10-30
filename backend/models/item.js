import { Schema, model } from "mongoose";
import { imageSchema } from "./image.js";

const ItemSchema = new Schema({
  images: { type: [imageSchema], required: true }, // Array of image objects
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category
  subCategoryId: { type: Schema.Types.ObjectId, required: true }, // Store subcategory _id
  subCategoryName: { type: String, required: true }, // Store name for quick access
  sizes: { type: [String], required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default model("Item", ItemSchema);
