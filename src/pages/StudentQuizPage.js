import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../styles/StudentQuizPage.css";

const StudentQuizPage = () => {
  const [questions, setQuestions] = useState([]); // ✅ Prevent 'undefined' error
  const [searchParams] = useSearchParams();
  const quizCode = searchParams.get("code");

  useEffect(() => {
    if (!quizCode) {
      // ✅ Prevents API call if no quizCode
      console.error("🚨 Quiz code is missing!");
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/get-questions/${quizCode}`
        );

        if (response.data && Array.isArray(response.data.questions)) {
          setQuestions(response.data.questions);
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [quizCode]);

  return (
    <div className="student-quiz-container">
      <h2>Quiz Questions</h2>

      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        questions.map((question, index) => (
          <div key={index} className="question-box">
            <p>{question.text}</p>
            <div className="options">
              {question.options.map((option, i) => (
                <button key={i} className="option-btn">
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentQuizPage;
