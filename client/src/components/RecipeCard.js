import React, { useState, useEffect, useCallback } from 'react';
import { Clock, Users, ChefHat, Flame, ChevronDown, ChevronUp, Heart, Trash2 } from 'lucide-react';
import { saveRecipe, deleteRecipe, checkRecipeSaved } from '../services/api';

const RecipeCard = ({ recipe, onSaveToggle, showDelete = false }) => {
  const [expanded, setExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkSavedStatus = useCallback(async () => {
    if (recipe.recipeId) {
      const saved = await checkRecipeSaved(recipe.recipeId);
      setIsSaved(saved);
    }
  }, [recipe.recipeId]);

  useEffect(() => {
    checkSavedStatus();
  }, [checkSavedStatus]);

  const handleSaveToggle = async () => {
    setLoading(true);
    try {
      if (isSaved && showDelete) {
        await deleteRecipe(recipe.recipeId);
        setIsSaved(false);
        if (onSaveToggle) onSaveToggle(recipe.recipeId, false);
      } else if (!isSaved) {
        await saveRecipe(recipe);
        setIsSaved(true);
        if (onSaveToggle) onSaveToggle(recipe.recipeId, true);
      }
    } catch (error) {
      console.error('Error toggling save:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatCuisine = (cuisine) => {
    if (!cuisine) return '';
    return cuisine.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatDiet = (diet) => {
    if (!diet) return '';
    return diet.charAt(0).toUpperCase() + diet.slice(1);
  };

  return (
    <div className="recipe-card">
      <div className="recipe-header">
        <div className="recipe-header-top">
          <h3 className="recipe-title">{recipe.name}</h3>
          <button 
            className={`save-btn ${isSaved ? 'saved' : ''}`}
            onClick={handleSaveToggle}
            disabled={loading}
            title={isSaved ? (showDelete ? 'Delete recipe' : 'Recipe saved') : 'Save recipe'}
          >
            {loading ? (
              <div className="loading-spinner-small"></div>
            ) : (
              showDelete && isSaved ? (
                <Trash2 size={20} />
              ) : (
                <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
              )
            )}
          </button>
        </div>
        <p className="recipe-description">{recipe.description}</p>
        {(recipe.cuisine || recipe.dietPreference) && (
          <div className="recipe-tags">
            {recipe.cuisine && (
              <span className="recipe-tag">{formatCuisine(recipe.cuisine)}</span>
            )}
            {recipe.dietPreference && (
              <span className="recipe-tag">{formatDiet(recipe.dietPreference)}</span>
            )}
          </div>
        )}
        {recipe.savedAt && (
          <p className="recipe-saved-date">Saved on {formatDate(recipe.savedAt)}</p>
        )}
      </div>

      <div className="recipe-meta">
        <div className="meta-item">
          <Clock size={20} />
          <div>
            <div className="meta-label">Prep Time</div>
            <div className="meta-value">{recipe.prepTime} min</div>
          </div>
        </div>
        <div className="meta-item">
          <Flame size={20} />
          <div>
            <div className="meta-label">Cook Time</div>
            <div className="meta-value">{recipe.cookTime} min</div>
          </div>
        </div>
        <div className="meta-item">
          <Users size={20} />
          <div>
            <div className="meta-label">Servings</div>
            <div className="meta-value">{recipe.servings}</div>
          </div>
        </div>
        <div className="meta-item">
          <ChefHat size={20} />
          <div>
            <div className="meta-label">Difficulty</div>
            <div className="meta-value">{recipe.difficulty}</div>
          </div>
        </div>
      </div>

      <div className="recipe-content">
        <div className="recipe-section">
          <h4 className="section-title">
            <span>📝</span> Ingredients
          </h4>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {expanded && (
          <>
            <div className="recipe-section">
              <h4 className="section-title">
                <span>👨‍🍳</span> Instructions
              </h4>
              <ol className="instructions-list">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>

            <div className="recipe-section">
              <h4 className="section-title">
                <span>🥗</span> Nutrition Information
              </h4>
              <div className="nutrition-grid">
                <div className="nutrition-item">
                  <div className="nutrition-value">{recipe.nutritionInfo.calories}</div>
                  <div className="nutrition-label">Calories</div>
                </div>
                <div className="nutrition-item">
                  <div className="nutrition-value">{recipe.nutritionInfo.protein}g</div>
                  <div className="nutrition-label">Protein</div>
                </div>
                <div className="nutrition-item">
                  <div className="nutrition-value">{recipe.nutritionInfo.carbs}g</div>
                  <div className="nutrition-label">Carbs</div>
                </div>
                <div className="nutrition-item">
                  <div className="nutrition-value">{recipe.nutritionInfo.fat}g</div>
                  <div className="nutrition-label">Fat</div>
                </div>
              </div>
            </div>
          </>
        )}

        <button 
          className="expand-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>Show Less <ChevronUp size={16} /></>
          ) : (
            <>Show Instructions <ChevronDown size={16} /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;