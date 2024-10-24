const express = require('express');
const router = express.Router();
const { getAIQuestion } = require('../services/aiService');
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/generate-question", authMiddleware, async (req, res) => {
  try {
    const { topic } = req.body; 

    const questionData = await getAIQuestion(topic);

    res.status(200).json({
      success: true,
      question: questionData.question,
      options: questionData.options,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;

