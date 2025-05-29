import React, { useState } from 'react';
import { Clock, Users, ChefHat, Flame, ChevronDown, ChevronUp } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="recipe-card">
      <div className="recipe-header">
        <h3 className="recipe-title">{recipe.name}</h3>
        <p className="recipe-description">{recipe.description}</p>
      </div>

      <div className="recipe-meta">
        <div className="meta-item">
          <Clock size={20} />
          <div>
            <div className="meta-label">Prep Time</div>
            <div className="meta-value">{recipe.prepTime}</div>
          </div>
        </div>
        <div className="meta-item">
          <Flame size={20} />
          <div>
            <div className="meta-label">Cook Time</div>
            <div className="meta-value">{recipe.cookTime}</div>
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