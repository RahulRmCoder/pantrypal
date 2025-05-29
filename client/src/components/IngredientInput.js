import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const IngredientInput = ({ ingredients, onAdd, onRemove }) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() && !ingredients.includes(input.trim())) {
      onAdd(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="ingredient-input-container">
      <h2 className="section-title">What ingredients do you have?</h2>
      <p className="section-subtitle">Add your available groceries, vegetables, meat, etc.</p>
      
      <div className="ingredient-input-wrapper">
        <input
          type="text"
          className="ingredient-input"
          placeholder="e.g., tomatoes, rice, chicken..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="add-btn" onClick={handleAdd}>
          <Plus size={20} />
          Add
        </button>
      </div>

      <div className="ingredient-tags">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-tag">
            {ingredient}
            <button 
              className="remove-tag" 
              onClick={() => onRemove(ingredient)}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {ingredients.length === 0 && (
        <p className="empty-state">Add at least 3 ingredients to get recipe suggestions</p>
      )}
    </div>
  );
};

export default IngredientInput;