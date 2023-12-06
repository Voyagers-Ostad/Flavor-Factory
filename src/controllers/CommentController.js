const fs = require("fs");
const Comment = require("../models/commentModel");
require("dotenv").config();
exports.createComment = async (req, res) => {
  try {
    const { comment_detail, rating, recipe_id } = req.body;
    // const user_id = req.user._id;

    // validation
    // switch (true) {
    //   case !comment_detail?.trim():
    //     return res.json({ error: "Please write something" });
    //   case !rating?.trim():
    //     return res.json({ error: "Please enter a rating" });
    // }

    // create product
    const comment = await Comment.create({
      comment_detail,
      rating,
      // user_id,
      recipe_id,
    });
    res.json(comment);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
//read all comments
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find(req.params.recipe_id);
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.log(err);
  }
};
//update comments
exports.updateComment = async (req, res) => {
  try {
    console.log("update");
    const { comment_detail, rating, recipe_id } = req.body;
    //const recipe_id = req.params.recipe_id;
    const comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        comment_detail: comment_detail,
        rating: rating,
        recipe_id: recipe_id,
      },
      { new: true }
    );

    await comment.save();
    res.json(comment);
  } catch (err) {
    console.log(err);
  }
};
//delete comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    res.json(comment);
  } catch (err) {
    console.log(err);
  }
};
