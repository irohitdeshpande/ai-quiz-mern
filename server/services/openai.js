// services/openAIService.js
const axios = require('axios');

// Function to generate quiz questions dynamically from OpenAI
const generateQuizQuestions = async (topic, level, numQuestions) => {
    const prompt = `Generate ${numQuestions} multiple-choice questions on the topic "${topic}" at "${level}" level. Each question should have 4 options (A, B, C, D), and one correct answer. Format the response in this JSON format:
    [
      {
        "name": "string",
        "correctOption": "string",
        "options": {
          "A": "string",
          "B": "string",
          "C": "string",
          "D": "string"
        }
      }
    ]`;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'gpt-4o-mini',  
                prompt: prompt,
                max_tokens: 128000,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Return the questions parsed from OpenAI's response
        return JSON.parse(response.data.choices[0].text.trim());
    } catch (error) {
        console.error('Error generating questions from OpenAI:', error);
        throw new Error('Failed to generate quiz questions.');
    }
};

module.exports = generateQuizQuestions;
