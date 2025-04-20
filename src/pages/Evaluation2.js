import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Evaluation.css";

const Evaluation2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, answers, quiz } = location.state || {};

  if (!quiz) {
    return (
      <div className="evaluation-container">
        <h2>No evaluation data available.</h2>
        <button className="home-btn" onClick={() => navigate("/")}>
          🏠 Home
        </button>
      </div>
    );
  }

  return (
    <div className="evaluation-container">
      <h2>📊 Quiz Evaluation</h2>
      <p>
        🎯 Your Score: {score} / {total}
      </p>

      <div className="answers-container">
        {quiz.map((q, index) => (
          <div key={index} className="question-evaluation">
            <p>
              <strong>
                Q{index + 1}: {q.question}
              </strong>
            </p>
            <p>✅ Correct Answer: {q.answer}</p>
            <p>📝 Your Answer: {answers[index] || "Not Answered"}</p>
            <hr />
          </div>
        ))}
      </div>

      <button className="home-btn" onClick={() => navigate("/")}>
        🏠 Home
      </button>
    </div>
  );
};

export default Evaluation2;
