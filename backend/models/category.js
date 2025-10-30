import { Schema, model } from "mongoose";

export const categorySchema = new Schema({
  name: String,
  subCategories: [{ name: String }],
});

export default model('Category', categorySchema);