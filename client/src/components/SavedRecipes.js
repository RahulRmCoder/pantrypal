import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Filter } from 'lucide-react';
import RecipeCard from './RecipeCard';
import { getSavedRecipes } from '../services/api';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    cuisine: 'all',
    diet: 'all',
    sort: 'newest'
  });

  const applyFilters = useCallback(() => {
    let filtered = [...savedRecipes];

    // Filter by cuisine
    if (filters.cuisine !== 'all') {
      filtered = filtered.filter(recipe => recipe.cuisine === filters.cuisine);
    }

    // Filter by diet
    if (filters.diet !== 'all') {
      filtered = filtered.filter(recipe => recipe.dietPreference === filters.diet);
    }

    // Sort
    switch (filters.sort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.savedAt) - new Date(b.savedAt));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredRecipes(filtered);
  }, [savedRecipes, filters]);

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const fetchSavedRecipes = async () => {
    try {
      setLoading(true);
      const recipes = await getSavedRecipes();
      setSavedRecipes(recipes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeDelete = (recipeId) => {
    setSavedRecipes(savedRecipes.filter(recipe => recipe.recipeId !== recipeId));
  };

  const uniqueCuisines = [...new Set(savedRecipes.map(r => r.cuisine))];
  const uniqueDiets = [...new Set(savedRecipes.map(r => r.dietPreference))];

  if (loading) {
    return (
      <div className="saved-recipes-section">
        <h2 className="saved-recipes-title">
          <Heart size={24} /> My Saved Recipes
        </h2>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading saved recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="saved-recipes-section">
        <h2 className="saved-recipes-title">
          <Heart size={24} /> My Saved Recipes
        </h2>
        <div className="error-container">
          <p className="error-message">Failed to load saved recipes</p>
          <button className="btn-primary" onClick={fetchSavedRecipes}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (savedRecipes.length === 0) {
    return (
      <div className="saved-recipes-section">
        <h2 className="saved-recipes-title">
          <Heart size={24} /> My Saved Recipes
        </h2>
        <div className="empty-saved-recipes">
          <Heart size={48} strokeWidth={1} />
          <p>No saved recipes yet</p>
          <p className="empty-subtitle">Start exploring and save your favorite recipes!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-recipes-section">
      <h2 className="saved-recipes-title">
        <Heart size={24} /> My Saved Recipes ({filteredRecipes.length})
      </h2>
      
      {savedRecipes.length > 0 && (
        <div className="saved-recipes-filters">
          <div className="filter-group">
            <label className="filter-label">Cuisine:</label>
            <select 
              className="filter-select"
              value={filters.cuisine}
              onChange={(e) => setFilters({...filters, cuisine: e.target.value})}
            >
              <option value="all">All Cuisines</option>
              {uniqueCuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>
                  {cuisine.charAt(0).toUpperCase() + cuisine.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Diet:</label>
            <select 
              className="filter-select"
              value={filters.diet}
              onChange={(e) => setFilters({...filters, diet: e.target.value})}
            >
              <option value="all">All Diets</option>
              {uniqueDiets.map(diet => (
                <option key={diet} value={diet}>
                  {diet.charAt(0).toUpperCase() + diet.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Sort by:</label>
            <select 
              className="filter-select"
              value={filters.sort}
              onChange={(e) => setFilters({...filters, sort: e.target.value})}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      )}

      {filteredRecipes.length === 0 ? (
        <div className="empty-saved-recipes">
          <Filter size={48} strokeWidth={1} />
          <p>No recipes match your filters</p>
          <p className="empty-subtitle">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="recipes-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe.recipeId} 
              recipe={recipe} 
              showDelete={true}
              onSaveToggle={handleRecipeDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;