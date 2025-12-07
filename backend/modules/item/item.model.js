import { Schema, model } from "mongoose";
import { imageSchema } from "../image/image.model.js";

const ItemSchema = new Schema({
    images: { type: [imageSchema], required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    sizes: { type: [String], required: true },
    description: { type: String },
    slug: { type: String, unique: true, index: true, sparse: true },
    createdAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null }
});

export default model("Item", ItemSchema);
