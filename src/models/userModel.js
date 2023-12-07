const mongoose = require("mongoose");
const userSchema = mongoose.Schema({

  name: {
    type: String,
    require: true
  },
  email: {
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
  },
  admin: {
    type: Boolean,
    default: false
  }
},
  { timestamps: true, versionKey: false }
);

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
