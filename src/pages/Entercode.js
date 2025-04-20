import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Entercode.css"; // Import the CSS file

const EnterCode = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!code) {
      alert("Please enter a test code!");
      return;
    }

    try {
      console.log(`📤 Sending request to validate code: ${code}`);

      const response = await axios.get(
        `http://localhost:5000/api/validate-code/${code}`
      );
      console.log("✅ Server Response:", response.data);

      if (response.data.type === "flashcard") {
        navigate(`/student-flashcard-page?code=${code}`);
      } else {
        alert("Invalid code. Please check and try again.");
      }
    } catch (error) {
      console.error("❌ Error validating code:", error.response?.data || error);
      alert("Invalid or expired code. Please try again.");
    }
  };

  return (
    <div className="enter-code-container">
      <div className="form-box">
        <h2>Enter Code</h2>

        {/* Input for flashcard test code */}
        <input
          type="text"
          placeholder="Enter test code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="input-field"
        />

        <button onClick={handleSubmit} className="submit-btn">
          Start Flashcard Test
        </button>

        {/* Button to go to the lesson code entry page */}
        <button
          onClick={() => navigate("/enter-lesson-code")}
          className="lesson-btn"
        >
          Access Lesson Notes
        </button>

        {/* New Button to go to EnterCodeQuiz page */}
        <button
          onClick={() => navigate("/enter-quiz-code")}
          className="quiz-btn"
        >
          Access Quiz
        </button>
      </div>
    </div>
  );
};

export default EnterCode;
