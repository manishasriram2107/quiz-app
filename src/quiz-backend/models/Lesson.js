const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  lessonCode: {
    // 🔹 Add lessonCode
    type: String,
    required: true,
    unique: true, // Ensure unique codes
  },
});

const Lesson = mongoose.model("Lesson", LessonSchema);

module.exports = Lesson;
