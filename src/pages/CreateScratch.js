import { useLocation } from "react-router-dom";
import React from "react";

const CreateScratch = () => {
  const location = useLocation();
  const quiz = location.state?.quiz || [];

  console.log("✅ Received Quiz Data in CreateScratch:", quiz);

  return (
    <div className="create-scratch-container">
      <h2>Finalize Quiz</h2>
      {quiz.length > 0 ? (
        <ul>
          {quiz.map((q, qIndex) => (
            <li key={qIndex}>
              <strong>
                {qIndex + 1}. {q.question}
              </strong>
              <ul>
                {q.options.map((option, oIndex) => (
                  <li key={oIndex}>{option}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quiz data available.</p>
      )}
    </div>
  );
};

export default CreateScratch;
