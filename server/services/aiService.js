const { GoogleGenAI } = require("@google/genai");
const dotenv = require('dotenv');
dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

const getAIQuestion = async (topic) => {
  try {
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }

    const prompt = `Make a multiple-choice question on ${topic} in JSON format as follows: {"name": "string", "correctOption": "string", "options": {"A": "string", "B": "string", "C": "string", "D": "string"}}.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    let responseText = response.text.trim();
    console.log("Raw response:", responseText); // Debugging output
    responseText = responseText.replace(/```json|```/g, '').trim();
    console.log("Trimmed response:", responseText); // Debugging output

    const questionData = JSON.parse(responseText);
    console.log("JSON.parse response:", questionData); // Debugging output
    return questionData;
  } catch (error) {
    console.error("Gemini AI Error:", error.message);
    
    // Provide more specific error messages
    if (error.message.includes('API key') || error.message.includes('authentication')) {
      throw new Error("Invalid or missing Gemini API key");
    } else if (error.message.includes('not found') || error.message.includes('404')) {
      throw new Error("Gemini API model not available - please check model name");
    } else if (error.message.includes('quota') || error.message.includes('429')) {
      throw new Error("Gemini API quota exceeded - please try again later");
    } else if (error.message.includes('JSON')) {
      throw new Error("Error parsing AI response - invalid JSON format");
    } else {
      throw new Error(`Error generating question: ${error.message}`);
    }
  }
}

module.exports = {
  getAIQuestion,
};

