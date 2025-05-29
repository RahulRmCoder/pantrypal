import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import DietPreference from '../components/DietPreference';
import CuisineSelection from '../components/CuisineSelection';
import IngredientInput from '../components/IngredientInput';

const Home = ({ preferences, setPreferences }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to results page
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return preferences.dietPreference !== '';
      case 2:
        return preferences.cuisine !== '';
      case 3:
        return preferences.ingredients.length >= 3;
      default:
        return false;
    }
  };

  const addIngredient = (ingredient) => {
    setPreferences({
      ...preferences,
      ingredients: [...preferences.ingredients, ingredient]
    });
  };

  const removeIngredient = (ingredient) => {
    setPreferences({
      ...preferences,
      ingredients: preferences.ingredients.filter(i => i !== ingredient)
    });
  };

  return (
    <div className="container">
      <Logo />
      
      <div className="step-indicator">
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
          <span className="step-number">1</span>
          <span>Diet Preference</span>
        </div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
          <span className="step-number">2</span>
          <span>Cuisine Type</span>
        </div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
          <span className="step-number">3</span>
          <span>Ingredients</span>
        </div>
      </div>

      <div className="card">
        {currentStep === 1 && (
          <DietPreference
            selected={preferences.dietPreference}
            onSelect={(value) => setPreferences({ ...preferences, dietPreference: value })}
          />
        )}
        
        {currentStep === 2 && (
          <CuisineSelection
            selected={preferences.cuisine}
            onSelect={(value) => setPreferences({ ...preferences, cuisine: value })}
          />
        )}
        
        {currentStep === 3 && (
          <IngredientInput
            ingredients={preferences.ingredients}
            onAdd={addIngredient}
            onRemove={removeIngredient}
          />
        )}

        <div className="nav-buttons">
          {currentStep > 1 && (
            <button className="nav-btn btn-secondary" onClick={handlePrevious}>
              <ArrowLeft size={20} />
              Previous
            </button>
          )}
          <button 
            className="nav-btn btn-primary" 
            onClick={handleNext}
            disabled={!canProceed()}
            style={{ marginLeft: currentStep === 1 ? 'auto' : '0' }}
          >
            {currentStep === 3 ? 'Generate Recipes' : 'Next'}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;