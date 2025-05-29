import React from 'react';

const CuisineSelection = ({ selected, onSelect }) => {
  const options = [
    { id: 'north-indian', title: 'North Indian', icon: '🍛', description: 'Rich, creamy curries' },
    { id: 'south-indian', title: 'South Indian', icon: '🥘', description: 'Rice, dosa, sambar' },
    { id: 'western', title: 'Western', icon: '🍕', description: 'Continental cuisine' },
    { id: 'arabic', title: 'Arabic', icon: '🥙', description: 'Middle Eastern flavors' },
    { id: 'chinese', title: 'Chinese', icon: '🥡', description: 'Stir-fries and noodles' }
  ];

  return (
    <div className="cuisine-selection">
      <h2 className="section-title">Choose your cuisine preference</h2>
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

export default CuisineSelection;