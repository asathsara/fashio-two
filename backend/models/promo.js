const mongoose = require("mongoose")

const promoScheme = new mongoose.Schema({
    itemId: { type: String, required: true },
    startDate: {type:String, required: true},
    startTime: {type:String, required: true},
    endDate: {type:String, required: true},
    endTime: {type:String, required: true},
    discount: {type:String, required: true},
})

module.exports = mongoose.model("Promo",promoScheme) 