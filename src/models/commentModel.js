const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    comment_detail: {
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
    // user_id: {
    //   type: ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    recipe_id: {
      type: ObjectId,
      ref: "Recipes",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
