const Recipe = require("../models/recipeModel.js");
const mongoose = require("mongoose");
const upload = require("../helpers/multerConfig.js");
const cloudinary = require("../helpers/cloudinaryConfig");
const fs = require("fs").promises;
const path = require("path");

// =============createRecipe===========
exports.createRecipe = async (req, res) => {
  try {
    const {
      title,
      ingredients,
      is_bake,
      meal,
      cuisine,
      occasion,
      cookTime,
      detail,
      category,
      servings,
    } = req.body;
    const photo = req.file;

    // console.log(photo)

    // Create a temporary file path
    const tempFilePath = path.join(
      __dirname,
      "../temp",
      `${photo.originalname}`
    );

    // Write the buffer to the temporary file
    await fs.writeFile(tempFilePath, photo.buffer);

    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: "recipe_images",
    });
    // Remove the temporary file
    await fs.unlink(tempFilePath);

    // Get the CDN URL
    const photoUrl = result.secure_url;

    const createdBy = req.user._id;

    const newRecipe = new Recipe({
      title,
      ingredients,
      is_bake,
      meal,
      cuisine,
      photo: photoUrl,
      occasion,
      cookTime,
      detail,
      category,
      servings,
      createdBy,
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
// =============readRecipes===========
exports.readRecipes = async (req, res) => {
  try {
    const listRecipe = await Recipe.find({}).limit(5).sort({ createdAt: -1 });

    res.json(listRecipe);
  } catch (err) {
    console.log(err);
  }
};
// =============readRecipe===========
exports.readOneRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const recipe = await Recipe.findById(recipeId);

    res.json(recipe);
  } catch (err) {
    console.log(err);
  }
};

// =============updateRecipe===========
exports.updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      ingredients,
      is_bake,
      meal,
      cuisine,
      occasion,
      cookTime,
      detail,
      category,
      servings,
    } = req.body;
    const recipe = await Recipe.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Recipe Updated!",
      recipe,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Updating Recipe",
      error,
    });
  }
};

// =============deleteRecipe===========
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      success: true,
      message: "Recipe Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing Recipe",
      error,
    });
  }
};

// shatabdi
// =============search Recipe===========
exports.recipeSearch = async (req, res) => {
  try {
    const queryConditions = [];

    // Loop through the request query parameters dynamically
    for (const key in req.query) {
      if (req.query.hasOwnProperty(key)) {
        const values = req.query[key].split(",");

        // Validate that values are present
        if (values.length > 0) {
          // Create a condition for the field with an array of values
          queryConditions.push({ [key]: { $in: values } });
        }
      }
    }

    if (queryConditions.length === 0) {
      return res
        .status(400)
        .json({ error: "No valid filter criteria provided" });
    }

    // Use an array to represent the $and condition
    const results = await Recipe.find({ $and: queryConditions });
    res.json(results);
  } catch (err) {
    console.log(err);
  }
};
// dropdowns
exports.getAllMeals = async (req, res) => {
  try {
    const dropdownValues = await Recipe.find({}, { _id: 0 });
    // console.log(dropdownValues);
    const uniqueMealsArray = [
      ...new Set(dropdownValues.flatMap((item) => item.meal)),
    ];

    // console.log(uniqueMealsArray);
    res.json(uniqueMealsArray);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getAllIngr = async (req, res) => {
  try {
    const dropdownValuesIngr = await Recipe.find(
      {},
      { ingredients: 1, _id: 0 }
    );
    // console.log(dropdownValuesIngr);
    const uniqueIngrArray = [
      ...new Set(dropdownValuesIngr.flatMap((item) => item.ingredients)),
    ];
    // console.log(uniqueBakeArray);
    res.json(uniqueIngrArray);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getAllOccasion = async (req, res) => {
  try {
    const dropdownValuesOcs = await Recipe.find({}, { occasion: 1, _id: 0 });
    // console.log(dropdownValuesOcs);
    const uniqueOcsArray = [
      ...new Set(dropdownValuesOcs.flatMap((item) => item.occasion)),
    ];
    // console.log(uniqueBakeArray);
    res.json(uniqueOcsArray);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getAllCuisines = async (req, res) => {
  try {
    const dropdownValuesCuisine = await Recipe.find({}, { cuisine: 1, _id: 0 });
    // console.log(dropdownValuesCuisine);
    const uniqueCuisineArray = [
      ...new Set(dropdownValuesCuisine.flatMap((item) => item.cuisine)),
    ];
    // console.log(uniqueBakeArray);
    res.json(uniqueCuisineArray);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
