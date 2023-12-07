


const express = require('express')
const router = require('./src/routes/api')
const recipeRouter = require('./src/routes/recipeAPI')
const userRouter = require('./src/routes/userAPI')
const commentAPI = require('./src/routes/commentAPI')
const blogsRouter = require("./src/routes/blogsAPI");
const tipsRouter = require("./src/routes/tipsAPI");
const bodyParser = require('body-parser')
require('dotenv').config();

const app = express();




//Security Midduleware
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");

//Security Midduleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

// BodyParser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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



// Managing BackEnd API Routing

app.use("/api/v1", router)
app.use("/api/v1/recipe", recipeRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/comment", commentAPI)
app.use("/api/v1/tips", tipsRouter);
app.use("/api/v1/blogs", blogsRouter);

module.exports = app;
