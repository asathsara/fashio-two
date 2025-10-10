import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: String,
  subCategories: [{ name: String }],
});

export default model('Category', categorySchema);