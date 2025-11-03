const express = require('express');
const router = express.Router();
const {
  getAllRecipes,
  getMyRecipes,
  getFavoriteRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  toggleFavorite,
} = require('../controllers/recipeController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getAllRecipes);
router.get('/my', protect, getMyRecipes);
router.get('/favorites', protect, getFavoriteRecipes);
router.get('/:id', getRecipeById);
router.post('/', protect, upload.single('coverImage'), createRecipe);
router.put('/:id', protect, upload.single('coverImage'), updateRecipe);
router.delete('/:id', protect, deleteRecipe);
router.post('/:id/favorite', protect, toggleFavorite);

module.exports = router;

