import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';
import Logo from '../components/Logo';
import RecipeResults from '../components/RecipeResults';
import { generateRecipes } from '../services/api';

const Results = ({ preferences }) => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!preferences.dietPreference || !preferences.cuisine || preferences.ingredients.length === 0) {
      navigate('/');
      return;
    }

    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await generateRecipes(preferences);
      setRecipes(data.recipes || []);
    } catch (err) {
      setError(err.message || 'Failed to generate recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="container">
        <Logo />
        <div className="card">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">
              Generating personalized recipes based on your preferences...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Logo />
        <div className="card">
          <div className="error-container">
            <AlertCircle size={48} className="error-icon" />
            <h2 className="error-message">Oops! Something went wrong</h2>
            <p className="error-details">{error}</p>
            <div className="nav-buttons">
              <button className="nav-btn btn-secondary" onClick={handleStartOver}>
                <ArrowLeft size={20} />
                Start Over
              </button>
              <button className="nav-btn btn-primary" onClick={fetchRecipes}>
                <RefreshCw size={20} />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Logo />
      <RecipeResults recipes={recipes} />
      <div className="nav-buttons">
        <button className="nav-btn btn-secondary" onClick={handleStartOver}>
          <ArrowLeft size={20} />
          Start Over
        </button>
      </div>
    </div>
  );
};

export default Results;