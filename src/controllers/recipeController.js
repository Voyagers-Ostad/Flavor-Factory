const Recipe = require("../models/recipeModel.js");

// =============createRecipe===========
exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
// =============updateRecipe===========
exports.updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, ingredients, is_bake,meal,cuisine,occasion,cookTime,detail,category,servings } = req.body;
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
