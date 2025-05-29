require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

console.log('Testing Gemini API...');
console.log('API Key exists:', !!process.env.GEMINI_API_KEY);

async function testAPI() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Use gemini-1.5-flash instead
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent("Say hello");
    const response = await result.response;
    const text = response.text();
    console.log('API Response:', text);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();