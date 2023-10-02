const mongoose=require('mongoose');

const Category = new mongoose.Schema({
    id: String,
    name: String,
  });

  module.exports = mongoose.model("CategoryData", Category);