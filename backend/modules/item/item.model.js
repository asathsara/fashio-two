import { Schema, model } from "mongoose";
import { imageSchema } from "../image/image.model.js";

const ItemSchema = new Schema({
    images: { type: [imageSchema], required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subCategory: { type: Schema.Types.ObjectId, required: true },
    sizes: { type: [String], required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default model("Item", ItemSchema);
