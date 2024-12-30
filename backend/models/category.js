const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: String,
    subItems: [{ name: String }],
  });
  
  const Category = mongoose.model('Category', categorySchema);