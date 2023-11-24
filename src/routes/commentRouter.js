const express = require("express");
const router = express.Router();
const {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/CommentController");

// comment Routing
router.get("/", getComments);
router.post("/create", createComment);
router.put("/update/:commentId", updateComment);
router.delete("/delete/:commentId", deleteComment);

module.exports = router;
