const express = require('express');
const router = express.Router();
const geminiService = require('../services/geminiService');

router.post('/generate', async (req, res) => {
  try {
    const { dietPreference, cuisine, ingredients } = req.body;
    
    // Validate input
    if (!dietPreference || !cuisine || !ingredients || ingredients.length === 0) {
      return res.status(400).json({ 
        error: 'Please provide diet preference, cuisine type, and ingredients' 
      });
    }

    // Generate recipes using Gemini
    const recipes = await geminiService.generateRecipes(
      dietPreference,
      cuisine,
      ingredients
    );

    res.json(recipes);
  } catch (error) {
    console.error('Error in recipe generation:', error);
    res.status(500).json({ 
      error: 'Failed to generate recipes. Please try again.' 
    });
  }
});

module.exports = router;