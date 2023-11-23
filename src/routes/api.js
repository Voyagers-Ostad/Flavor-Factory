const express = require("express");
const router = express.Router();
const {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/CommentController");
// API Routing

router.get("/",async (req, res) => {
    try {
        res.status(200).json("hello");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
=======
router.post("/comment", createComment);
router.get("/comments", getComments);
router.put("/comment/:commentId", updateComment);
router.delete("/comment/:commentId", deleteComment);


module.exports = router;
