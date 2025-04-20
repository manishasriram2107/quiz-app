import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Evaluation.css";

const Evaluation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flashcards, answers } = location.state || {
    flashcards: [],
    answers: {},
  };

  const [userName, setUserName] = useState("");
  const [department, setDepartment] = useState("");

  let correctCount = 0;
  flashcards.forEach((card, index) => {
    if (card.answer.toLowerCase() === (answers[index] || "").toLowerCase()) {
      correctCount++;
    }
  });

  const totalQuestions = flashcards.length;
  const score = ((correctCount / totalQuestions) * 100).toFixed(2);

  const goToCertificate = async () => {
    if (!userName || !department) {
      alert("Please enter your Name and Department.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userName, department, score }),
      });

      if (response.ok) {
        console.log("Score saved successfully!");
        navigate(
          `/certificate?name=${encodeURIComponent(
            userName
          )}&department=${encodeURIComponent(department)}&score=${score}`
        );
      } else {
        console.error("Failed to save score");
      }
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  return (
    <div className="evaluation-container">
      <div className="evaluation-card">
        <h2>Quiz Results</h2>
        <h3>Score: {score}%</h3>

        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <button className="get-certificate-btn" onClick={goToCertificate}>
          Get Certificate
        </button>
      </div>
    </div>
  );
};

export default Evaluation;
