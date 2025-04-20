const express = require("express");
const Question = require("../models/Question");
const router = express.Router();

router.post("/questions", async (req, res) => {
  try {
    const { category, questionType, question, answer, testCode } = req.body;

    // ✅ Debugging: Log incoming request body
    console.log("Received request body:", req.body);

    // ✅ Check if all required fields exist
    if (!category || !questionType || !question || !answer || !testCode) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newQuestion = new Question({
      category,
      questionType,
      question,
      answer,
      testCode,
    });
    await newQuestion.save();

    res
      .status(201)
      .json({ message: "Question added successfully!", newQuestion });
  } catch (error) {
    console.error("Error saving question:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;
