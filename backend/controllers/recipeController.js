const asyncHandler = require('../middleware/asyncHandler');
const Recipe = require('../models/Recipe');
const fs = require('fs');
const path = require('path');


exports.getAllRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find().populate('createdBy', 'name email');
  res.status(200).json(recipes);
});


exports.getMyRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({ createdBy: req.user._id }).populate('createdBy', 'name email');
  res.status(200).json(recipes);
});


exports.getFavoriteRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({ favorites: req.user._id }).populate('createdBy', 'name email');
  res.status(200).json(recipes);
});

exports.getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate('createdBy', 'name email');

  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  res.status(200).json(recipe);
});


exports.createRecipe = asyncHandler(async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  
  const ingredientsArray = typeof ingredients === 'string' 
    ? ingredients.split(',').map(item => item.trim())
    : ingredients;

  const recipe = await Recipe.create({
    title,
    coverImage: req.file ? `/images/${req.file.filename}` : '',
    ingredients: ingredientsArray,
    instructions,
    createdBy: req.user._id,
  });

  const populatedRecipe = await Recipe.findById(recipe._id).populate('createdBy', 'name email');
  
  res.status(201).json(populatedRecipe);
});


exports.updateRecipe = asyncHandler(async (req, res) => {
  let recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  if (recipe.createdBy.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const { title, ingredients, instructions } = req.body;
  
  const ingredientsArray = typeof ingredients === 'string' 
    ? ingredients.split(',').map(item => item.trim())
    : ingredients;

  recipe.title = title || recipe.title;
  recipe.ingredients = ingredientsArray || recipe.ingredients;
  recipe.instructions = instructions || recipe.instructions;

  if (req.file) {
    if (recipe.coverImage) {
      const oldImagePath = path.join(__dirname, '../public', recipe.coverImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    recipe.coverImage = `/images/${req.file.filename}`;
  }

  const updatedRecipe = await recipe.save();
  const populatedRecipe = await Recipe.findById(updatedRecipe._id).populate('createdBy', 'name email');

  res.status(200).json(populatedRecipe);
});

exports.deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  if (recipe.createdBy.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  if (recipe.coverImage) {
    const imagePath = path.join(__dirname, '../public', recipe.coverImage);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await recipe.deleteOne();
  res.status(200).json({ message: 'Recipe deleted' });
});

exports.toggleFavorite = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  const isFavorite = recipe.favorites.includes(req.user._id);

  if (isFavorite) {
    recipe.favorites.pull(req.user._id);
  } else {
    recipe.favorites.push(req.user._id);
  }

  await recipe.save();
  const populatedRecipe = await Recipe.findById(recipe._id).populate('createdBy', 'name email');

  res.status(200).json(populatedRecipe);
});

