import { Schema, model } from "mongoose";

const ItemSchema = new Schema({
  urls: { type: [String], required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: [String], required: true },
  description: { type: String },
});

export default model("Item", ItemSchema);
