const mongoose=require('mongoose');
const Category_Schema=require("../Models/Category_Schema")
const Post = new mongoose.Schema({
    id: String,
    title: String,
    content: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CategoryData', // This references the 'Category' collection
    },
  });

  module.exports = mongoose.model("PostData", Post);