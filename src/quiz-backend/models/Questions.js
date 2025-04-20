const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  category: { type: String, required: true }, // Example: "Computer Science"
  questionType: {
    type: String,
    enum: ["MCQ", "Coding", "Theory", "Flashcard"],
    required: true,
  },
  question: { type: String, required: true },
  answer: { type: String, required: true }, // For flashcards, this is the back side
  testCode: { type: String, required: true },
});

module.exports = mongoose.model("Question", QuestionSchema);
