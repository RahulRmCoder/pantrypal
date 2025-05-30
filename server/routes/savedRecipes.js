const express = require('express');
const router = express.Router();
const SavedRecipe = require('../models/SavedRecipe');
const { v4: uuidv4 } = require('uuid');

// Get all saved recipes
router.get('/', async (req, res) => {
  try {
    const savedRecipes = await SavedRecipe.find()
      .sort({ savedAt: -1 }) // Most recent first
      .lean();
    
    res.json(savedRecipes);
  } catch (error) {
    console.error('Error fetching saved recipes:', error);
    res.status(500).json({ error: 'Failed to fetch saved recipes' });
  }
});

// Save a recipe
router.post('/save', async (req, res) => {
  try {
    const recipe = req.body;
    
    // Generate unique ID if not provided
    if (!recipe.recipeId) {
      recipe.recipeId = uuidv4();
    }

    // Check if recipe already exists
    const existingRecipe = await SavedRecipe.findOne({ recipeId: recipe.recipeId });
    if (existingRecipe) {
      return res.status(409).json({ error: 'Recipe already saved' });
    }

    const savedRecipe = new SavedRecipe(recipe);
    await savedRecipe.save();
    
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ error: 'Failed to save recipe' });
  }
});

// Delete a saved recipe
router.delete('/:recipeId', async (req, res) => {
  try {
    const { recipeId } = req.params;
    
    const result = await SavedRecipe.findOneAndDelete({ recipeId });
    
    if (!result) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

// Check if a recipe is saved
router.get('/check/:recipeId', async (req, res) => {
  try {
    const { recipeId } = req.params;
    
    const recipe = await SavedRecipe.findOne({ recipeId });
    
    res.json({ isSaved: !!recipe });
  } catch (error) {
    console.error('Error checking recipe:', error);
    res.status(500).json({ error: 'Failed to check recipe status' });
  }
});

module.exports = router;