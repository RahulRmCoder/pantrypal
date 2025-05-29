const { GoogleGenerativeAI } = require('@google/generative-ai');
// Add dotenv config at the top of the file
require('dotenv').config();

class GeminiService {
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    
    console.log('Initializing GeminiService...');
    console.log('API Key exists:', !!apiKey);
    console.log('API Key length:', apiKey?.length);
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY is missing from environment variables');
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    // Updated model name - use gemini-1.5-flash instead of gemini-pro
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log('GeminiService initialized successfully');
  }

  async generateRecipes(dietPreference, cuisine, ingredients) {
    const prompt = `
      You are a world-renowned chef with expertise in ${cuisine} cuisine. Your task is to create 6 unique, delicious recipes based on the following requirements:

      Diet Preference: ${dietPreference}
      Cuisine Type: ${cuisine}
      Available Ingredients: ${ingredients.join(', ')}

      IMPORTANT INSTRUCTIONS:
      1. Create exactly 6 different recipes that can be made using ONLY the available ingredients listed above
      2. Each recipe must strictly adhere to the ${dietPreference} dietary restrictions
      3. Recipes should be authentic to ${cuisine} cuisine style and flavors
      4. Provide detailed, clear instructions that even a beginner can follow
      5. Include specific measurements, temperatures, and cooking times
      6. Add helpful tips or techniques where appropriate

      For each recipe, provide the following in a structured JSON format:
      {
        "recipes": [
          {
            "name": "Specific name of the dish",
            "description": "Appetizing 2-3 sentence description explaining the dish, its flavors, and what makes it special",
            "prepTime": "X",
            "cookTime": "Y",
            "difficulty": "Easy/Medium/Hard",
            "servings": "Number of servings (e.g., 4)",
            "ingredients": [
              "Ingredient 1 - exact quantity (e.g., 2 cups rice)",
              "Ingredient 2 - exact quantity (e.g., 1 tablespoon oil)",
              "Include ALL ingredients with specific measurements"
            ],
            "instructions": [
              "Step 1: Detailed instruction with specific actions, temperatures, and timing (e.g., Heat oil in a pan over medium heat for 2 minutes until shimmering)",
              "Step 2: Clear instruction with visual cues when helpful (e.g., Sauté onions for 5-7 minutes until golden brown and fragrant)",
              "Step 3: Include cooking techniques and tips (e.g., Stir constantly to prevent sticking, the mixture should coat the back of a spoon)",
              "Continue with detailed steps until the dish is complete",
              "Final step: Presentation and serving suggestions"
            ],
            "nutritionInfo": {
              "calories": "XXX",
              "protein": "XX",
              "carbs": "XX",
              "fat": "XX"
            }
          }
        ]
      }

      Additional Guidelines:
      - For ${dietPreference === 'vegetarian' ? 'vegetarian recipes, ensure no meat or fish products are used' : ''}
      - For ${dietPreference === 'vegan' ? 'vegan recipes, ensure no animal products including dairy, eggs, or honey are used' : ''}
      - For ${dietPreference === 'non-veg' ? 'non-vegetarian recipes, you can include meat, fish, or poultry if available in the ingredients' : ''}
      - For ${dietPreference === 'eggetarian' ? 'eggetarian recipes, include eggs but no meat or fish' : ''}
      - Make sure each recipe is distinct and offers variety in cooking methods (grilling, sautéing, baking, etc.)
      - Consider different meal types (appetizers, main courses, sides, etc.) for variety

      Respond ONLY with valid JSON, no additional text or markdown formatting.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean the response text to extract JSON
      let cleanedText = text.trim();
      
      // Remove markdown code blocks if present
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/```json\s*/, '').replace(/```\s*$/, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/```\s*/, '').replace(/```\s*$/, '');
      }
      
      // Try to find JSON object in the text
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanedText = jsonMatch[0];
      }
      
      try {
        const parsedData = JSON.parse(cleanedText);
        return parsedData;
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        console.log('Raw response:', text);
        
        // Return a fallback structure if parsing fails
        return {
          recipes: [{
            name: "Error: Could not parse recipes",
            description: "Please try again",
            prepTime: "0",
            cookTime: "0",
            difficulty: "N/A",
            servings: "0",
            ingredients: ["Unable to generate recipes"],
            instructions: ["Please try generating recipes again"],
            nutritionInfo: {
              calories: "0",
              protein: "0",
              carbs: "0",
              fat: "0"
            }
          }]
        };
      }
    } catch (error) {
      console.error('Error generating recipes:', error);
      throw error;
    }
  }
}

module.exports = new GeminiService();