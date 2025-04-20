import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GenerateAI.css";

const GenerateAI = () => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const navigate = useNavigate();

  const GEMINI_API_KEY = "AIzaSyDpqdxVLUhR70Qqgp5aZtzeEoMn56tMrwA"; // Store this securely, preferably in an environment variable.

  const handleGenerateAI = async () => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: `Generate ${difficulty} level quiz questions for ${topic}.` }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
      
      // Convert response to an array of questions (assuming AI returns a list format)
      setGeneratedQuestions(aiResponse.split("\n").filter((q) => q.trim() !== ""));
      
    } catch (error) {
      console.error("Error generating quiz:", error);
    }
  };

  return (
    <div className="ai-wrapper">
      <button className="back-btn" onClick={() => navigate("/assignments")}>
        🔙 Back to Import Page
      </button>
      <h2>Generate Quiz with AI</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter Topic (e.g., Math, Science)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button className="generate-btn" onClick={handleGenerateAI}>
        🤖 Generate Questions
      </button>

      {generatedQuestions.length > 0 && (
        <div className="ai-results">
          <h3>Generated Questions:</h3>
          <ul>
            {generatedQuestions.map((q, index) => (
              <li key={index}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GenerateAI;
