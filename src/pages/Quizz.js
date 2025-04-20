import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Quizz.css";

const questions = [
  {
    id: 1,
    question:
      "Which programming language is known as the backbone of web development?",
    options: ["Python", "JavaScript", "C++"],
    answer: "JavaScript",
  },
  {
    id: 2,
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "High-Level Text Management Language",
      "Home Tool Markup Language",
    ],
    answer: "HyperText Markup Language",
  },
  {
    id: 3,
    question: "Which CSS property is used to change text color?",
    options: ["font-color", "text-color", "color"],
    answer: "color",
  },
  {
    id: 4,
    question: "React is primarily used for building?",
    options: ["Databases", "User Interfaces", "Operating Systems"],
    answer: "User Interfaces",
  },
  {
    id: 5,
    question: "Which company developed the React framework?",
    options: ["Google", "Facebook", "Microsoft"],
    answer: "Facebook",
  },
  {
    id: 6,
    question: "What is the purpose of a database index?",
    options: ["Speed up queries", "Store data", "Encrypt information"],
    answer: "Speed up queries",
  },
  {
    id: 7,
    question: "Which SQL command is used to retrieve data from a database?",
    options: ["SELECT", "INSERT", "UPDATE"],
    answer: "SELECT",
  },
  {
    id: 8,
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Advanced Program Integration",
      "Automated Processing Interface",
    ],
    answer: "Application Programming Interface",
  },
  {
    id: 9,
    question: "Which JavaScript framework is used for building mobile apps?",
    options: ["Django", "React Native", "Laravel"],
    answer: "React Native",
  },
  {
    id: 10,
    question: "Which protocol is used to send emails?",
    options: ["HTTP", "SMTP", "FTP"],
    answer: "SMTP",
  },
];
function Quizz() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const name = queryParams.get("name") || "Student";
  const department = queryParams.get("department") || "Unknown";

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [error, setError] = useState("");

  const handleOptionSelect = (questionId, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length < questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) {
        score++;
      }
    });

    // Navigate to Evaluation Page
    navigate(
      `/evaluation?name=${encodeURIComponent(
        name
      )}&department=${encodeURIComponent(
        department
      )}&score=${score}&answers=${encodeURIComponent(
        JSON.stringify(selectedAnswers)
      )}`
    );
  };

  return (
    <div className="quiz-container">
      <h2>Quiz</h2>
      <p>
        <strong>Name:</strong> {name} | <strong>Department:</strong>{" "}
        {department}
      </p>

      {questions.map((q) => (
        <div key={q.id} className="question-card">
          <p>{q.question}</p>
          <div className="options">
            {q.options.map((option) => (
              <button
                key={option}
                className={selectedAnswers[q.id] === option ? "selected" : ""}
                onClick={() => handleOptionSelect(q.id, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {error && <p className="error-message">{error}</p>}

      <button className="btn primary" onClick={handleSubmit}>
        Submit Quiz
      </button>
    </div>
  );
}

export default Quizz;
