const express = require("express");
const router = express.Router();
const tipsController = require("../controllers/tipsController");

//tips API

//create
router.post("/createTips", tipsController.createTips);

//read
router.get("/readTips", tipsController.readTips);

//readOne
router.get("/readOneTips/:id", tipsController.readOneTips);

//update
router.post("/updateTips/:id", tipsController.updateTips);

//delete
router.post("/deleteTips/:id", tipsController.deleteTips);

module.exports = router;
