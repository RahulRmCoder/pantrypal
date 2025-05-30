# PantryPal 🍳

Your intelligent kitchen companion that generates personalized recipes based on your dietary preferences, cuisine choices, and available ingredients.

![PantryPal](https://img.shields.io/badge/PantryPal-Recipe%20Generator-purple)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-14%2B-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)
![Gemini API](https://img.shields.io/badge/Gemini-API-orange)

## 🌟 Features

- **Personalized Recipe Generation**: Get 6 unique recipes tailored to your preferences
- **Dietary Restrictions Support**: Vegetarian, Non-vegetarian, Vegan, and Eggetarian options
- **Multiple Cuisine Types**: North Indian, South Indian, Western, Arabic, and Chinese
- **Ingredient-Based Suggestions**: Add your available ingredients and get recipes using only what you have
- **Save Favorite Recipes**: Save recipes you love and access them anytime
- **Recipe Management**: View, filter, and delete saved recipes
- **Advanced Filtering**: Filter saved recipes by cuisine type, diet preference, or sort by date/name
- **Detailed Instructions**: Step-by-step cooking instructions with timings and temperatures
- **Nutrition Information**: Calories, protein, carbs, and fat content for each recipe
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Smart AI Integration**: Powered by Google's Gemini AI for intelligent recipe creation

## 📸 Screenshots

### Home Page - Diet Preference Selection
The app starts by asking your dietary preferences with beautiful option cards.

### Cuisine Selection
Choose from 5 different cuisine types to match your taste.

### Ingredient Input
Add all available ingredients with an intuitive tag-based interface.

### Recipe Results
View 6 personalized recipes with expandable cards showing full details. Save your favorites with the heart icon.

### Saved Recipes
Access all your saved recipes with filters and sorting options.

## 🚀 Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons
- **CSS3** - Styling with animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database for saved recipes
- **Mongoose** - MongoDB ODM
- **Google Generative AI** - Gemini API for recipe generation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)
- A Google Cloud account with Gemini API access

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pantrypal.git
   cd pantrypal
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `server` directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/pantrypal
   ```

   Create a `.env` file in the `client` directory (optional):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## 🔑 Getting API Keys & Database Setup

### Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click on "Get API key" or "Create API key"
4. Select the project "Gemini API" when prompted
5. Copy the generated API key
6. Add it to your `server/.env` file

### MongoDB Setup
#### Option 1: Local MongoDB
1. Install MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/pantrypal`

#### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Set up database user and whitelist your IP
4. Get connection string and replace in `.env`

## 💻 Running the Application

1. **Start MongoDB** (if using local installation)
   ```bash
   mongod
   ```

2. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:5000`

3. **Start the Frontend Application**
   ```bash
   cd client
   npm start
   ```
   The app will open in your browser at `http://localhost:3000`

## 📁 Project Structure

```
pantrypal/
├── client/                    # React frontend
│   ├── public/               # Static files
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Logo.js
│   │   │   ├── DietPreference.js
│   │   │   ├── CuisineSelection.js
│   │   │   ├── IngredientInput.js
│   │   │   ├── RecipeResults.js
│   │   │   ├── RecipeCard.js
│   │   │   └── SavedRecipes.js
│   │   ├── pages/           # Page components
│   │   │   ├── Home.js
│   │   │   └── Results.js
│   │   ├── services/        # API services
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── server/                   # Node.js backend
│   ├── models/              # MongoDB models
│   │   └── SavedRecipe.js
│   ├── routes/              # API routes
│   │   ├── recipes.js
│   │   └── savedRecipes.js
│   ├── services/            # Business logic
│   │   └── geminiService.js
│   ├── server.js            # Express server
│   └── package.json
└── README.md
```

## 🎯 How to Use

### Generate New Recipes
1. **Select Diet Preference**: Choose from Vegetarian, Non-vegetarian, Vegan, or Eggetarian
2. **Choose Cuisine Type**: Pick your preferred cuisine style
3. **Add Ingredients**: Enter all available ingredients in your pantry (minimum 3)
4. **Generate Recipes**: Click "Generate Recipes" to get 6 personalized recipes
5. **View Details**: Click on recipe cards to see detailed instructions and nutrition info

### Save & Manage Recipes
1. **Save Recipes**: Click the heart icon on any recipe to save it
2. **View Saved Recipes**: Click "View Saved Recipes" button on home page
3. **Filter Saved Recipes**: Use dropdown filters for cuisine type and diet preference
4. **Sort Recipes**: Sort by newest, oldest, or alphabetically
5. **Delete Recipes**: Click the trash icon in saved recipes view

## 🔧 API Endpoints

### Recipe Generation
- **URL**: `/api/recipes/generate`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "dietPreference": "vegetarian",
    "cuisine": "north-indian",
    "ingredients": ["rice", "tomatoes", "onions", "spices"]
  }
  ```

### Saved Recipes
- **Get All**: `GET /api/saved-recipes`
- **Save Recipe**: `POST /api/saved-recipes/save`
- **Check Status**: `GET /api/saved-recipes/check/:recipeId`
- **Delete Recipe**: `DELETE /api/saved-recipes/:recipeId`

## 🎨 Features in Detail

### Recipe Cards
- Expandable design with "Show Instructions" button
- Heart icon for saving/unsaving recipes
- Display prep time, cook time, servings, and difficulty
- Show cuisine type and diet preference tags
- Nutrition information panel

### Saved Recipes Management
- Persistent storage using MongoDB
- Real-time save/unsave functionality
- Advanced filtering by cuisine and diet type
- Multiple sorting options
- Shows save date for each recipe
- Bulk management capabilities

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error**
   - Ensure your Gemini API key is valid
   - Check that the `.env` file is in the `server` directory
   - No quotes around the API key in `.env`

2. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - For Atlas, whitelist your IP address

3. **CORS Error**
   - Make sure both frontend and backend are running
   - Check the proxy setting in `client/package.json`

4. **Recipe Generation Failed**
   - Verify internet connection
   - Check API key validity
   - Ensure at least 3 ingredients are added

### Debug Mode

Add these to your `server/server.js` for debugging:
```javascript
console.log('API Key loaded:', !!process.env.GEMINI_API_KEY);
console.log('MongoDB connected:', mongoose.connection.readyState);
```

## 📝 Environment Variables

### Server
- `GEMINI_API_KEY` - Your Google Gemini API key (required)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string (required)

### Client
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000/api)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Add comments for complex logic
- Update documentation for new features
- Write meaningful commit messages
- Test thoroughly before submitting PR

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powering recipe generation
- React.js community for the excellent framework
- MongoDB for reliable data persistence
- Lucide React for beautiful icons
- All contributors who help improve PantryPal

## 📈 Future Enhancements

- [ ] User authentication and personal profiles
- [ ] Recipe sharing with other users
- [ ] Shopping list generation from recipes
- [ ] Meal planning calendar
- [ ] Recipe rating and reviews
- [ ] Export recipes as PDF
- [ ] Mobile app version
- [ ] Multi-language support

## 📞 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

---

Made with ❤️ by [Your Name]