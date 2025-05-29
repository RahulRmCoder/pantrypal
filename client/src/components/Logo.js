import React from 'react';
import { ChefHat } from 'lucide-react';

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo">
        <div className="logo-icon">
          <ChefHat size={40} color="white" />
        </div>
        <div>
          <h1 className="logo-text">PantryPal</h1>
          <p className="logo-tagline">Your intelligent kitchen companion</p>
        </div>
      </div>
    </div>
  );
};

export default Logo;