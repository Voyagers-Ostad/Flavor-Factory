// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");

const routes = require("./routes");
require("./config/database");
require("./config/passport");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/", routes);

//resource not found
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

//server error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


module.exports = app;

