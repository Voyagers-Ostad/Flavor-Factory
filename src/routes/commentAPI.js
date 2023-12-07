const express = require('express')
const router= express.Router()
const {
    createComment,
    getCommentsByRecipeId,
    getComments,
    updateComment,
    deleteComment,
  } = require("../controllers/CommentController")
const { checkForAuth}=require('../middlewares/auth')

//Comments API

router.post("/:recipeId", checkForAuth('token'),createComment);
router.get("/read/:recipeId", getCommentsByRecipeId);

module.exports=router