const express = require("express");
const router = express.Router();
const {
  createRecipe,
  readRecipes,
  updateRecipe,
  deleteRecipe,
  recipeSearch,
  getAllMeals,
  getAllIngr,
  getAllOccasion,
  getAllCuisines,
} = require("../controllers/recipeController");

//Recipes API

router.post("/recipe", createRecipe);
router.get("/allrecipes", readRecipes);
router.put("/update-recipe/:id", updateRecipe);
router.delete("/delete-recipe/:id", deleteRecipe);
router.get("/search", recipeSearch); //(shatabdi)

router.get("/meals", getAllMeals);
router.get("/ingredient", getAllIngr);
router.get("/occasion", getAllOccasion);
router.get("/cuisine", getAllCuisines);
module.exports = router;
