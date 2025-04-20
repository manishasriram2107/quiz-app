import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizSubmitted = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const quizCode = location.state?.quizCode || "N/A";

  return (
    <div className="quiz-submitted-container">
      <h2>🎉 Quiz Submitted Successfully!</h2>
      <p>
        Your Quiz Code: <strong>{quizCode}</strong>
      </p>
      <button className="home-btn" onClick={() => navigate("/")}>
        🏠 Go Home
      </button>
    </div>
  );
};

export default QuizSubmitted;
