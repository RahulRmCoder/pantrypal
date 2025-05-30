const mongoose = require('mongoose');

const savedRecipeSchema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  prepTime: String,
  cookTime: String,
  difficulty: String,
  servings: String,
  ingredients: [String],
  instructions: [String],
  nutritionInfo: {
    calories: String,
    protein: String,
    carbs: String,
    fat: String
  },
  dietPreference: String,
  cuisine: String,
  savedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SavedRecipe', savedRecipeSchema);