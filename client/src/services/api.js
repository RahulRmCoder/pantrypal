import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const generateRecipes = async (preferences) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recipes/generate`, {
      dietPreference: preferences.dietPreference,
      cuisine: preferences.cuisine,
      ingredients: preferences.ingredients
    });
    
    return response.data;
  } catch (error) {
    console.error('Error generating recipes:', error);
    throw new Error(error.response?.data?.error || 'Failed to generate recipes');
  }
};

// Saved recipes API calls
export const getSavedRecipes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/saved-recipes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching saved recipes:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch saved recipes');
  }
};

export const saveRecipe = async (recipe) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/saved-recipes/save`, recipe);
    return response.data;
  } catch (error) {
    console.error('Error saving recipe:', error);
    throw new Error(error.response?.data?.error || 'Failed to save recipe');
  }
};

export const deleteRecipe = async (recipeId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/saved-recipes/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw new Error(error.response?.data?.error || 'Failed to delete recipe');
  }
};

export const checkRecipeSaved = async (recipeId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/saved-recipes/check/${recipeId}`);
    return response.data.isSaved;
  } catch (error) {
    console.error('Error checking recipe status:', error);
    return false;
  }
};