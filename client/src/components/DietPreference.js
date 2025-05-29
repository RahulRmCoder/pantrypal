import React from 'react';
import { Leaf, Drumstick, Egg, Fish } from 'lucide-react';

const DietPreference = ({ selected, onSelect }) => {
  const options = [
    { id: 'vegetarian', title: 'Vegetarian', icon: '🥗', description: 'Plant-based diet' },
    { id: 'non-veg', title: 'Non-Vegetarian', icon: '🍖', description: 'Includes meat' },
    { id: 'vegan', title: 'Vegan', icon: '🌱', description: 'No animal products' },
    { id: 'eggetarian', title: 'Eggetarian', icon: '🥚', description: 'Vegetarian + eggs' }
  ];

  return (
    <div className="diet-preference">
      <h2 className="section-title">What's your diet preference?</h2>
      <div className="option-grid">
        {options.map(option => (
          <div
            key={option.id}
            className={`option-card ${selected === option.id ? 'selected' : ''}`}
            onClick={() => onSelect(option.id)}
          >
            <div className="option-icon">{option.icon}</div>
            <h3 className="option-title">{option.title}</h3>
            <p className="option-description">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietPreference;