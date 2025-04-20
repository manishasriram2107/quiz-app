import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../styles/Quiz.css";

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialQuiz = location.state?.quiz || [];

  console.log("📥 Received Quiz Data:", initialQuiz); // Debugging log

  // Extract only the questions (positions 1, 7, 13, 19, 25, etc.)
  const filteredQuestions = initialQuiz.filter(
    (_, index) => (index - 1) % 6 === 0
  );

  console.log("✅ Extracted Questions:", filteredQuestions); // Debugging log

  const [quiz] = useState(filteredQuestions);

  const handleNext = () => {
    console.log("🚀 Finalized Quiz Data:", quiz);
    navigate("/create-scratch", { state: { quiz } });
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h2 className="quiz-title">Quiz Questions</h2>
        {quiz.length > 0 ? (
          <ul className="quiz-list">
            {quiz.map((question, index) => (
              <li key={index} className="quiz-question">
                <strong>
                  {index + 1}. {question}
                </strong>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-questions">No questions available.</p>
        )}
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;
