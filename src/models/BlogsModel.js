const mongoose = require("mongoose");
const dataSchema = mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    author: { type: String },
    createdAt: { type: Date, default: Date.now() },
  },
  { versionkey: false }
);

const blogsModel = mongoose.model("blogs", dataSchema);
module.exports = blogsModel;
