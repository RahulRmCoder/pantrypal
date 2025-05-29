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