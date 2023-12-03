const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
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
      enum: ["kitchen tools", "new kitchen set", "culinary"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const blogsModel = mongoose.model("blogs", dataSchema);
module.exports = blogsModel;
