import mongoose from "mongoose";

export const imageSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Image", imageSchema);
