const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    is_bake: {
      type: Boolean,
      required: true,
    },
    meal: {
      type: [String],
      required: true,
    },
    cuisine: {
      type: [String],
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    occasion: {
      type: [String],
      required: true,
    },
    cookTime: {
      type: Number,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    category: {
      type: [String],
      required: true,
    },
    servings: {
      type: [String],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Recipe = mongoose.model("Recipes", recipeSchema);

module.exports = Recipe;
