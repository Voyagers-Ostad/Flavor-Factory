const express = require('express')
const router= express.Router()

// API Routing
// Import route handlers
const homeRoute = require("../controllers/homeController");
const registerRoute = require("../controllers/registerController");
const loginRoute = require("../controllers/loginController");
const profileRoute = require("../controllers/profileController");

// Use route handlers
router.use("/", homeRoute);
router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/profile", profileRoute);




module.exports=router