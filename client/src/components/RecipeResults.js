import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeResults = ({ recipes }) => {
  return (
    <div className="recipe-results">
      <div className="results-header">
        <h2 className="results-title">Your Personalized Recipes</h2>
        <p className="results-subtitle">Based on your preferences and available ingredients</p>
      </div>
      
      <div className="recipes-grid">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeResults;