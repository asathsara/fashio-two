import { Schema, model } from "mongoose";

const promoSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: true,
    },
    startDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endDate: { type: String, required: true },
    endTime: { type: String, required: true },
    discount: { type: String, required: true },
});

export default model("Promo", promoSchema);
