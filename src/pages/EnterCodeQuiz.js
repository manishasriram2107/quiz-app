import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Entercode.css";

const EnterCodeQuiz = () => {
  const [quizCode, setQuizCode] = useState("");
  const navigate = useNavigate();

  const handleQuizSubmit = async () => {
    if (!quizCode) {
      alert("Please enter a quiz code!");
      return;
    }

    try {
      console.log(`📤 Fetching questions for quiz code: ${quizCode}`);

      const response = await axios.get(
        `http://localhost:5000/api/get-quiz/${quizCode}`
      );
      console.log("✅ Quiz Data:", response.data);

      if (response.data.questions) {
        navigate(`/student-quiz-page?code=${quizCode}`, {
          state: { questions: response.data.questions },
        });
      } else {
        alert("Invalid quiz code. Please check and try again.");
      }
    } catch (error) {
      console.error("❌ Error fetching quiz:", error.response?.data || error);
      alert("Invalid or expired quiz code. Please try again.");
    }
  };

  return (
    <div className="enter-code-container">
      <div className="form-box">
        <h2>Enter Quiz Code</h2>

        <input
          type="text"
          placeholder="Enter quiz code"
          value={quizCode}
          onChange={(e) => setQuizCode(e.target.value)}
          className="input-field"
        />

        <button onClick={handleQuizSubmit} className="submit-btn">
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default EnterCodeQuiz;
