//import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Entercode from "./pages/Entercode";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TeachingDashboard from "./pages/TeachingDashboard";
import "../src/styles/Home.css";
import Assignments from "./pages/Assignments";
import ImportWorksheets from "./pages/ImportWorksheets";
import GenerateAI from "./pages/GenerateAI";
import CreateScratch from "./pages/CreateScratch";
import Lessons from "./pages/Lessons";
import InteractiveVideos from "./pages/InteractiveVideos";
import PassagePage from "./pages/PassagePage";
import FlashcardPage from "./pages/FlashcardPage";
import EnterDetails from "./pages/EnterDetails";
import Quizz from "./pages/Quizz";
import Certificate from "./pages/Certificate";
import Evaluation from "./pages/Evaluation";
import StudentFlashcardPage from "./pages/StudentFlashcardPage";
import CreateLesson from "./teachers/CreateLesson";
import StudentAccess from "./pages/StudentAccess";
import EnterLessonCode from "./pages/EnterLessonCode";
import Evaluation2 from "./pages/Evaluation2";
import TestSetup from "./pages/TestSetup";
import ReviewQuestions from "./pages/ReviewQuestions";
import QuizSubmitted from "./pages/QuizSubmitted";
import EnterCodeQuiz from "./pages/EnterCodeQuiz";
import StudentQuizPage from "./pages/StudentQuizPage";
import StudentRecords from "./pages/StudentRecords";
import ScoresPage from "./pages/ScoresPage";

function App() {
  return (
    <Router>
      <header>
        <div className="navbar">
          <div className="logo-container">
            <img src={process.env.PUBLIC_URL + "/image.png"} alt="Logo" />
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">For Schools</Link>
              </li>
              <li>
                <Link to="#">Plans</Link>
              </li>
              <li>
                <Link to="#">Solutions</Link>
              </li>
              <li>
                <Link to="#">Resources</Link>
              </li>
            </ul>
          </nav>
          <div className="buttons">
            <Link to="/enter-details">
              <button className="btn">Enter Code</button>
            </Link>
            <Link to="/login">
              <button className="btn secondary">Log In</button>
            </Link>
            <Link to="/signup">
              <button className="btn primary">Sign Up</button>
            </Link>
          </div>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/enter-code" element={<Entercode />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/teaching-dashboard" element={<TeachingDashboard />} />
        <Route path="/import-worksheets" element={<ImportWorksheets />} />
        <Route path="/generate-ai" element={<GenerateAI />} />
        <Route path="/create-scratch" element={<CreateScratch />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/interactive-videos" element={<InteractiveVideos />} />
        <Route path="/passage-page" element={<PassagePage />} />
        <Route path="/flashcard-page" element={<FlashcardPage />} />
        <Route path="/enter-details" element={<EnterDetails />} />
        <Route path="/quizz" element={<Quizz />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/evaluation" element={<Evaluation />} />
        <Route
          path="/student-flashcard-page"
          element={<StudentFlashcardPage />}
        />
        <Route path="/student-access" element={<StudentAccess />} />
        <Route path="/create-lesson" element={<CreateLesson />} />
        <Route path="/enter-lesson-code" element={<EnterLessonCode />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/evaluation2" element={<Evaluation2 />} />
        <Route path="/test-setup" element={<TestSetup />} />
        <Route path="/review-questions" element={<ReviewQuestions />} />
        <Route path="/quiz-submitted" element={<QuizSubmitted />} />
        <Route path="/enter-quiz-code" element={<EnterCodeQuiz />} />
        <Route path="/student-quiz-page" element={<StudentQuizPage />} />
        <Route path="/student-records" element={<StudentRecords />} />
        <Route path="/scores-page" element={<ScoresPage />} />
      </Routes>
    </Router>
  );
}

export default App;
