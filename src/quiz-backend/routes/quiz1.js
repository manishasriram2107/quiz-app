const express = require("express");
const QuizSubmission = require("../models/QuizSubmission"); // Ensure this model exists

const router = express.Router();

// ✅ Submit a Quiz
router.post("/submit-quiz", async (req, res) => {
  try {
    const { quizCode, questions } = req.body;
    const newQuiz = new QuizSubmission({ quizCode, questions });
    await newQuiz.save();
    res.status(201).json({ message: "Quiz submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a Quiz by quizCode
router.get("/get-quiz/:quizCode", async (req, res) => {
  try {
    const quizCode = req.params.quizCode;
    console.log("🔍 Searching for quiz with code:", quizCode);

    // ✅ Make sure you are using the correct model
    const quiz = await QuizSubmission.findOne({ quizCode });

    if (!quiz) {
      console.log("❌ Quiz not found for code:", quizCode);
      return res.status(404).json({ message: "Quiz not found" });
    }

    console.log("✅ Quiz found:", quiz);
    res.json({ questions: quiz.questions });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
