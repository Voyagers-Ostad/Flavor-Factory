const mongoose = require("mongoose");
const userSchema = mongoose.Schema({

  firstname: {
    type: String,
    require: true
  },
  lastname: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  address: {
    type: String,
  }
});

const User = mongoose.model("user", userSchema);
module.exports = User;
