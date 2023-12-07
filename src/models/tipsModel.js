const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      enum: ["kitchen-tips", "tools-tips", "recipe-tips"],
    },
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
  },
  { timestamps: true, versionKey: false }
);

const tipsModel = mongoose.model("tips", dataSchema);
module.exports = tipsModel;
