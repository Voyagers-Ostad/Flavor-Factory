const express = require("express");
const router = express.Router();
const {
  createRecipe,
  readRecipes,
  readOneRecipe,
  updateRecipe,
  deleteRecipe,
  recipeSearch,
  getAllMeals,
  getAllIngr,
  getAllOccasion,
  getAllCuisines,
} = require("../controllers/recipeController");
const { checkForAuth } = require("../middlewares/auth");
const upload = require("../helpers/multerConfig");

//Recipes API

router.post(
  "/postrecipe",
  checkForAuth("token"),
  upload.single("photo"),
  createRecipe
);
router.get("/allrecipes", readRecipes);
router.get("/onerecipe/:recipeId", readOneRecipe);
router.put("/update-recipe/:id", checkForAuth("token"), updateRecipe);
router.delete("/delete-recipe/:id", checkForAuth("token"), deleteRecipe);

router.get("/search", recipeSearch);
// dropdown
router.get("/meals", getAllMeals);
router.get("/ingredient", getAllIngr);
router.get("/occasion", getAllOccasion);
router.get("/cuisine", getAllCuisines);
module.exports = router;
