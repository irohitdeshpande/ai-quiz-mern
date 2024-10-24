const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 100, // Adjust to limit response size for questions
  responseMimeType: "text/plain",
};

const getAIQuestion = async (topic) => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const prompt = `Make a multiple-choice question on ${topic} in JSON format as follows: {"name": "string", "correctOption": "string", "options": {"A": "string", "B": "string", "C": "string", "D": "string"}}`;
    
    const result = await chatSession.sendMessage(prompt);
    
    const responseText = result.response.text().trim();
    console.log("Raw response:", responseText); // Debugging output

    const questionData = JSON.parse(responseText);
    return questionData;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Error generating question");
  }
}

module.exports = {
  getAIQuestion,
};

// Example usage (optional)
(async () => {
  try {
    const question = await getAIQuestion("space exploration");
    console.log(question);
  } catch (err) {
    console.error(err);
  }
})();

