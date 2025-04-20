import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TestSetup.css";

const TestSetup = () => {
  const navigate = useNavigate();
  const [subjectCode, setSubjectCode] = useState("");
  const [instructions, setInstructions] = useState("");
  const [testCode, setTestCode] = useState(null);

  const generateTestCode = () => {
    const randomCode = Math.random().toString(36).substr(2, 8).toUpperCase();
    setTestCode(randomCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateTestCode();
  };

  return (
    <div className="test-setup-container">
      <h2>Setup Your Quiz</h2>
      <form onSubmit={handleSubmit}>
        <label>Subject Code:</label>
        <input
          type="text"
          value={subjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
          required
        />

        <label>Instructions:</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        ></textarea>

        <button type="submit">Generate Test Code</button>
      </form>

      {testCode && (
        <div className="test-code-display">
          <p>
            Your Test Code: <strong>{testCode}</strong>
          </p>
          <button
            onClick={() =>
              navigate("/quiz", {
                state: { testCode, subjectCode, instructions },
              })
            }
          >
            Proceed to Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default TestSetup;
