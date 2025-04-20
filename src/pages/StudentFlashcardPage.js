import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/StudentFlashcardPage.css";

const StudentFlashcardPage = () => {
  const [searchParams] = useSearchParams();
  const testCode = searchParams.get("code") || "";
  const navigate = useNavigate();

  const [flashcards, setFlashcards] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    if (testCode) {
      fetchFlashcards(testCode);
    }
  }, [testCode]);

  const fetchFlashcards = async (code) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/flashcards/${code}`
      );
      const data = await response.json();
      if (response.ok) {
        setFlashcards(data);
      } else {
        alert(data.message || "No flashcards found.");
      }
    } catch (error) {
      console.error("Error fetching flashcards:", error);
      alert("Failed to fetch flashcards.");
    }
  };

  const handleAnswerSubmit = (index) => {
    const userAnswer = answers[index]?.trim();
    if (!userAnswer) {
      alert("Please enter an answer before submitting.");
      return;
    }

    const isCorrect =
      flashcards[index]?.answer?.toLowerCase() === userAnswer.toLowerCase();

    setFeedback((prev) => ({
      ...prev,
      [index]: isCorrect ? "✅ Correct!" : "❌ Incorrect",
    }));

    setFlipped((prev) => ({ ...prev, [index]: true }));
  };

  // Function to navigate to Evaluation Page
  const goToEvaluation = () => {
    navigate("/evaluation", { state: { flashcards, answers } });
  };

  return (
    <div className="flashcard-container">
      <h2>Student Flashcard Page</h2>
      <h3>Test Code: {testCode}</h3>

      <div className="flashcard-grid">
        {flashcards.map((card, index) => (
          <div
            key={index}
            className={`flashcard ${flipped[index] ? "flipped" : ""}`}
          >
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <h3>Q: {card.question}</h3>
                <input
                  type="text"
                  placeholder="Your answer..."
                  value={answers[index] || ""}
                  onChange={(event) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [index]: event.target.value,
                    }))
                  }
                  disabled={flipped[index]}
                />
                <button
                  onClick={() => handleAnswerSubmit(index)}
                  disabled={flipped[index]}
                >
                  Submit
                </button>
              </div>

              <div className="flashcard-back">
                <h3>{feedback[index]}</h3>
                <p>Correct Answer: {card.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Get Results Button */}
      <button className="get-results-btn" onClick={goToEvaluation}>
        Get Results
      </button>
    </div>
  );
};

export default StudentFlashcardPage;
