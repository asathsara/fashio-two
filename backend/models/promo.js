import { Schema, model } from "mongoose"

const promoScheme = new Schema({
    item: { type: Object, required: true },
    startDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endDate: { type: String, required: true },
    endTime: { type: String, required: true },
    discount: { type: String, required: true },
})

export default model("Promo", promoScheme) 