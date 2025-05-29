# PantryPal 🍳

Your intelligent kitchen companion that generates personalized recipes based on your dietary preferences, cuisine choices, and available ingredients.

![PantryPal](https://img.shields.io/badge/PantryPal-Recipe%20Generator-purple)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-14%2B-green)
![Gemini API](https://img.shields.io/badge/Gemini-API-orange)

## 🌟 Features

- **Personalized Recipe Generation**: Get 6 unique recipes tailored to your preferences
- **Dietary Restrictions Support**: Vegetarian, Non-vegetarian, Vegan, and Eggetarian options
- **Multiple Cuisine Types**: North Indian, South Indian, Western, Arabic, and Chinese
- **Ingredient-Based Suggestions**: Add your available ingredients and get recipes using only what you have
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
View 6 personalized recipes with expandable cards showing full details.

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
- **Google Generative AI** - Gemini API for recipe generation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- A Google Cloud account with Gemini API access

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RahulRmCoder/pantrypal.git
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
   ```

   Create a `.env` file in the `client` directory (optional):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## 🔑 Getting Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click on "Get API key" or "Create API key"
4. Select the project "Gemini API" when prompted
5. Copy the generated API key
6. Add it to your `server/.env` file

## 💻 Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:5000`

2. **Start the Frontend Application**
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
│   │   │   └── RecipeCard.js
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
│   ├── routes/              # API routes
│   │   └── recipes.js
│   ├── services/            # Business logic
│   │   └── geminiService.js
│   ├── server.js            # Express server
│   └── package.json
└── README.md
```

## 🎯 How to Use

1. **Select Diet Preference**: Choose from Vegetarian, Non-vegetarian, Vegan, or Eggetarian
2. **Choose Cuisine Type**: Pick your preferred cuisine style
3. **Add Ingredients**: Enter all available ingredients in your pantry
4. **Generate Recipes**: Click "Generate Recipes" to get 6 personalized recipes
5. **View Details**: Click on recipe cards to see detailed instructions and nutrition info

## 🔧 API Endpoints

### Generate Recipes
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
- **Response**: Array of 6 recipe objects with details

## 🎨 Customization

### Styling
- All styles are in `client/src/App.css`
- Color scheme uses purple/indigo gradients
- Fully responsive design

### Adding New Cuisines
1. Update `CuisineSelection.js` component
2. Add new cuisine option to the options array

### Adding New Diet Types
1. Update `DietPreference.js` component
2. Add new diet option to the options array
3. Update the prompt in `geminiService.js` if needed

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error**
   - Ensure your Gemini API key is valid
   - Check that the `.env` file is in the `server` directory
   - No quotes around the API key in `.env`

2. **CORS Error**
   - Make sure both frontend and backend are running
   - Check the proxy setting in `client/package.json`

3. **Recipe Generation Failed**
   - Verify internet connection
   - Check API key validity
   - Ensure at least 3 ingredients are added

### Debug Mode

Add these to your `server/server.js` for debugging:
```javascript
console.log('API Key loaded:', !!process.env.GEMINI_API_KEY);
```

## 📝 Environment Variables

### Server
- `GEMINI_API_KEY` - Your Google Gemini API key (required)
- `PORT` - Server port (default: 5000)

### Client
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000/api)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powering recipe generation
- React.js community for the excellent framework
- Lucide React for beautiful icons

## 📞 Support

For support, email rahulrajasekharanmenon64325@gmail.com or open an issue in the GitHub repository.

---

Made with ❤️ by [Rahul Rajasekharan Menon]