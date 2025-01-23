const mongoose = require("mongoose")

const promoScheme = new mongoose.Schema({
    item: { type: Object, required: true },
    startDate: {type:String, required: true},
    startTime: {type:String, required: true},
    endDate: {type:String, required: true},
    endTime: {type:String, required: true},
    discount: {type:String, required: true},
})

module.exports = mongoose.model("Promo",promoScheme) 