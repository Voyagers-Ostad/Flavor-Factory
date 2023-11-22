const express = require("express");
const router = express.Router();
const {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/CommentController");
// API Routing
router.post("/comment", createComment);
router.get("/comments", getComments);
router.put("/comment/:commentId", updateComment);
router.delete("/comment/:commentId", deleteComment);

module.exports = router;
