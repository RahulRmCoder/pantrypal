import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import './App.css';

function App() {
  const [preferences, setPreferences] = useState({
    dietPreference: '',
    cuisine: '',
    ingredients: []
  });

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<Home preferences={preferences} setPreferences={setPreferences} />} 
          />
          <Route 
            path="/results" 
            element={<Results preferences={preferences} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;