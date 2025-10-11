import { Schema, model } from "mongoose";

const imageSchema = new Schema({
  url: String,
});

export default model("Image", imageSchema);
