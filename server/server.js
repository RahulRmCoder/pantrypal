const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const recipeRoutes = require('./routes/recipes');
const mongoose = require('mongoose');
const savedRecipeRoutes = require('./routes/savedRecipes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pantrypal')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/saved-recipes', savedRecipeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});