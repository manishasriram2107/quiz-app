import React, { useState } from "react";
import "../styles/FlashcardPage.css";

const FlashcardPage = () => {
  const [testCode] = useState(() => Math.random().toString(36).substr(2, 6)); // Generate test code
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [flashcards, setFlashcards] = useState([]); // Store flashcards

  const handleSaveQuestion = async () => {
    if (!question || !answer) {
      alert("Please enter both question and answer.");
      return;
    }

    const newFlashcard = {
      category: "General",
      questionType: "Flashcard",
      question,
      answer,
      testCode, // Include testCode here
    };

    try {
      const response = await fetch("http://localhost:5000/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFlashcard),
      });

      const data = await response.json();
      alert(data.message);

      // Add new flashcard to state
      setFlashcards([...flashcards, newFlashcard]);
      setQuestion("");
      setAnswer("");
    } catch (error) {
      console.error("Error saving flashcard:", error);
      alert("Failed to save flashcard. Check console for details.");
    }
  };

  return (
    <div className="flashcard-container">
      <div className="flashcard-box">
        <h2>Flashcard Creator</h2>
        <p className="test-code">
          Test Code: <strong>{testCode}</strong>
        </p>

        <input
          type="text"
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="input-field"
        />
        <button onClick={handleSaveQuestion} className="save-btn">
          Save Flashcard
        </button>

        <h3>Saved Flashcards:</h3>
        <ul className="flashcard-list">
          {flashcards.map((card, index) => (
            <li key={index} className="flashcard">
              <span className="question">{card.question}</span>
              <span className="answer">{card.answer}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlashcardPage;
