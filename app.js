
const express = require('express')
const router = require('./src/routes/api')
const recipeRouter = require('./src/routes/recipeAPI')
const app= express()
const bodyParser= require('body-parser')
require('dotenv').config();



//Security Midduleware
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

//Security Midduleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// BodyParser
app.use(bodyParser.json());

//Rate Limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 100, max: 3000 });

// Database
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));

// FrontEnd Tagging
// app.use(express.static('client/dist'))
// app.get("*",function(req,res){
//     req.sendFile(__dirname,'client','build','index.html')
// })

// Managing BackEnd API Routing

app.use("/api/v1",router)
app.use("/api/v1/recipe",recipeRouter)


module.exports = app;
