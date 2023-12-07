
const Comment = require("../models/commentModel");
const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');
require("dotenv").config();

// ==================createComment===================

exports.createComment = async (req, res) => {
  try {
    const { text,rating } = req.body;
    const userId = req.user._id;
    const recipeId = req.params.recipeId;

    const comment = new Comment({
      user_id: userId,
      recipe_id:  recipeId,
      text,rating
    });

    await comment.save();

    await Recipe.findByIdAndUpdate(recipeId, { $push: { comments: comment._id } });

    res.status(201).json({ message: 'Comment created successfully', comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// ==================getCommentsByRecipeId===================

exports.getCommentsByRecipeId = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const comments = await Comment.find({ recipe_id:recipeId })
    .populate({
      path: 'user_id',
      model: User,
      select: 'name', // Select the fields you want to include
    });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
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
