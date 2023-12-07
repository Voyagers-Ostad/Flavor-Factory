const Recipe = require("../models/recipeModel.js");
const mongoose = require("mongoose")
const upload = require('../helpers/multerConfig.js');
const cloudinary = require('../helpers/cloudinaryConfig');
const fs = require('fs').promises;
const path = require('path');






// =============createRecipe===========
exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, is_bake, meal, cuisine, occasion, cookTime, detail, category, servings } = req.body;
    const photo = req.file;

    // console.log(photo)

    // Create a temporary file path
    const tempFilePath = path.join(__dirname, '../temp', `${photo.originalname}`);

    // Write the buffer to the temporary file
    await fs.writeFile(tempFilePath, photo.buffer);

    const result = await cloudinary.uploader.upload(tempFilePath, { folder: 'recipe_images' });
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
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};
// =============readRecipes===========
exports.readRecipes = async (req, res) => {
  try {
    const listRecipe = await Recipe.find({})
      .limit(5)
      .sort({ createdAt: -1 });

    res.json(listRecipe);
  } catch (err) {
    console.log(err);
  }
}
// =============readRecipe===========
exports.readRecipe = async (req, res) => {
  try {

    const recipeId = req.params.recipeId;
    const recipe = await Recipe.findById(recipeId)

    res.json(recipe);
  } catch (err) {
    console.log(err);
  }
}

// =============updateRecipe===========
exports.updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, ingredients, is_bake, meal, cuisine, occasion, cookTime, detail, category, servings } = req.body;
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
    const recipe = await Recipe.findByIdAndDelete(req.params.id)

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