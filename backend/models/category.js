const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: String,
    subItems: [{ name: String }],
  });
  
 module.exports = mongoose.model('Category', categorySchema);