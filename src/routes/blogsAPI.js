const express = require("express");
const router = express.Router();
const BlogsController = require("../controllers/BlogsController");

//blogs API

//create
router.post("/createPost", BlogsController.createPost);

//read
router.get("/readPost", BlogsController.readPost);

//readOne
router.get("/readOnePost/:id", BlogsController.readOnePost);

//update
router.post("/updatePost/:id", BlogsController.updatePost);

//delete
router.post("/deletePost/:id", BlogsController.deletePost);

module.exports = router;
