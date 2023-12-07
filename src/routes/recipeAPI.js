const express = require('express')
const router= express.Router()
const {createRecipe,readRecipes,updateRecipe,deleteRecipe,readRecipe}=require('../controllers/recipeController')
const { checkForAuth}=require('../middlewares/auth')
const upload = require('../helpers/multerConfig');



//Recipes API

router.post('/postrecipe',checkForAuth('token'),upload.single('photo'),createRecipe );
router.get('/allrecipes',readRecipes );
router.get('/onerecipe/:recipeId',readRecipe );
router.put("/update-recipe/:id",checkForAuth('token') ,updateRecipe);
router.delete("/delete-recipe/:id",checkForAuth('token'), deleteRecipe);

module.exports=router