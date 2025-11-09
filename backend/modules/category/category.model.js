import { Schema, model } from "mongoose";

const subCategorySchema = new Schema({
    name: { type: String, required: true }
}, { _id: true });

export const categorySchema = new Schema({
    name: { type: String, required: true },
    subCategories: [subCategorySchema],
});

export default model('Category', categorySchema);
