const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Support for form submissions
app.use("/uploads", express.static("uploads")); // ✅ Serve uploaded PDFs
const quizRoutes = require("./routes/quiz1"); // ✅ Import quiz routes
app.use("/api", quizRoutes); // ✅ Use quiz routes

const studentRoutes = require("./routes/students");
app.use("/api/students", studentRoutes); // ✅ Use student routes

const scoreRoutes = require("./routes/scores");
app.use("/api/scores", scoreRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const authRoutes = require("./routes/auth"); // Import authentication routes
app.use("/api/auth", authRoutes); // Use authentication routes

// ✅ Set up storage for PDF files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const PORT = 5000;

// 🔹 Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/quizapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// 🔹 Define Lesson Schema
const lessonSchema = new mongoose.Schema({
  title: String,
  notes: String,
  lessonCode: String,
  pdfUrl: String, // ✅ Store PDF file path
});

const Lesson = mongoose.model("Lesson", lessonSchema);

// 🔹 Define Flashcard Schema
const flashcardSchema = new mongoose.Schema({
  category: String,
  questionType: String,
  question: String,
  answer: String,
  testCode: String,
});
const testSchema = new mongoose.Schema({
  title: String,
  testCode: { type: String, unique: true }, // Unique Test Code
  questions: [
    {
      question: String,
      options: [String], // Multiple choice options
      answer: String, // Correct answer
    },
  ],
});
const Test = mongoose.model("Test", testSchema);

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

// ✅ Create Lesson with PDF (Teachers' Side)
// ✅ Create Lesson with PDF Upload (Teachers' Side)
app.post("/api/create-lesson", upload.single("file"), async (req, res) => {
  const { title, notes, testCode } = req.body;
  const file = req.file; // Get the uploaded file

  // Debugging: Log received data
  console.log("📩 Received Data:", { title, notes, testCode });
  console.log("📂 Uploaded File:", file);

  if (!title || !notes || !testCode) {
    console.error("❌ Missing fields:", { title, notes, testCode });
    return res
      .status(400)
      .json({ message: "Title, Notes, and Test Code are required" });
  }

  if (!file) {
    console.error("❌ Missing file upload");
    return res.status(400).json({ message: "PDF file is required" });
  }

  try {
    const newLesson = new Lesson({
      title,
      notes,
      lessonCode: testCode,
      pdfUrl: `/uploads/${file.filename}`, // ✅ Store file path
    });

    await newLesson.save();

    res.status(201).json({
      message: "Lesson created successfully!",
      lesson: newLesson,
    });
  } catch (error) {
    console.error("❌ Error saving lesson:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Serve uploaded PDFs
app.use("/uploads", express.static("uploads"));

// ✅ Save Flashcard (Teachers' Side)
app.post("/api/questions", async (req, res) => {
  try {
    const { category, questionType, question, answer, testCode } = req.body;

    if (!question || !answer || !testCode) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const newFlashcard = new Flashcard({
      category,
      questionType,
      question,
      answer,
      testCode,
    });

    await newFlashcard.save();

    res.status(201).json({ message: "Flashcard saved successfully!" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/get-lesson/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const lesson = await Lesson.findOne({ lessonCode: code });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json({
      title: lesson.title,
      notes: lesson.notes, // ✅ Make sure notes are included
      pdfUrl: lesson.pdfUrl,
    });
  } catch (error) {
    console.error("Error fetching lesson:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Validate Test Code (Flashcards or Lessons)
app.get("/api/validate-code/:code", async (req, res) => {
  const { code } = req.params;
  console.log(`🔎 Searching for code: ${code}`);

  try {
    const flashcard = await Flashcard.findOne({ testCode: code });
    if (flashcard) {
      console.log("✅ Found Flashcard Test Code:", code);
      return res.json({ type: "flashcard" });
    }

    const lesson = await Lesson.findOne({ lessonCode: code });
    if (lesson) {
      console.log("✅ Found Lesson Code:", code);
      return res.json({ type: "lesson" });
    }

    console.log("❌ Code not found:", code);
    return res.status(404).json({ message: "Code not found" });
  } catch (error) {
    console.error("❌ Error validating code:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Fetch Flashcards by Test Code (Students' Side)
app.get("/api/flashcards/:code", async (req, res) => {
  const { code } = req.params;
  try {
    const flashcards = await Flashcard.find({ testCode: code });

    if (!flashcards || flashcards.length === 0) {
      return res.status(404).json({ message: "No flashcards found" });
    }

    res.json(flashcards);
  } catch (error) {
    console.error("❌ Error fetching flashcards:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/api/get-quiz/:quizCode", async (req, res) => {
  const quizCode = req.params.quizCode; // ✅ Corrected
  try {
    const quiz = await QuizModel.findOne({ quizCode: quizCode });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
});
app.get("/api/scores", async (req, res) => {
  try {
    const scores = await ScoreModel.find();
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching scores" });
  }
});
// 🔹 Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
