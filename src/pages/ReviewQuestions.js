import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ReviewQuestions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(location.state?.quiz || []);

  const handleDelete = (index) => {
    setQuiz(quiz.filter((_, i) => i !== index));
  };

  const handleEdit = (index, newText) => {
    setQuiz((prevQuiz) =>
      prevQuiz.map((q, i) => (i === index ? { ...q, text: newText } : q))
    );
  };

  const generateQuizCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const handleSubmit = async () => {
    if (quiz.length === 0) {
      alert("⚠ No questions to submit!");
      return;
    }

    const generatedCode = generateQuizCode();
    console.log("✅ Quiz submitted with code:", generatedCode);

    try {
      // ✅ Ensure correct format before sending data
      await axios.post("http://localhost:5000/api/submit-quiz", {
        testCode: generatedCode,
        questions: quiz.map((q) => ({
          text: q.text || q, // ✅ If q is a string, use it as text
          options: q.options || [], // ✅ Ensure options exist
        })),
      });

      navigate("/quiz-submitted", { state: { quizCode: generatedCode } });
    } catch (error) {
      console.error("❌ Error saving quiz:", error);
      alert("Failed to save quiz. Please try again.");
    }
  };

  return (
    <div className="review-container">
      <h2>Review & Submit Quiz</h2>
      {quiz.length > 0 ? (
        <ul className="quiz-list">
          {quiz.map((question, index) => (
            <li key={index} className="quiz-item">
              <input
                type="text"
                value={question}
                onChange={(e) => handleEdit(index, e.target.value)}
                className="edit-input"
              />
              <button
                className="delete-btn"
                onClick={() => handleDelete(index)}
              >
                ❌ Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions available.</p>
      )}
      <button className="submit-btn" onClick={handleSubmit}>
        🚀 Submit Quiz
      </button>
    </div>
  );
};

export default ReviewQuestions;
