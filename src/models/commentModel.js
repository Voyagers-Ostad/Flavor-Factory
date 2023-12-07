const mongoose = require("mongoose");
const User= require('./userModel')

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      required: true,
    },
    rating: {
      type: Number,
      minimum: 1,
      maximum: 5,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipe_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
