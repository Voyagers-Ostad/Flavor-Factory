const express = require("express");
const router = express.Router();
const {
  createRecipe,
  readRecipes,
  updateRecipe,
  deleteRecipe,
  recipeSearch,
} = require("../controllers/recipeController");

//Recipes API

router.post("/recipe", createRecipe);
router.get("/allrecipes", readRecipes);
router.put("/update-recipe/:id", updateRecipe);
router.delete("/delete-recipe/:id", deleteRecipe);
router.get("/search", recipeSearch); //(shatabdi)

module.exports = router;
