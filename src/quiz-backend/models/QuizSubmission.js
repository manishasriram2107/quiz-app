const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  quizCode: String,
  questions: Array,
});

const QuizModel = mongoose.model("Quiz", quizSchema);
module.exports = QuizModel;
