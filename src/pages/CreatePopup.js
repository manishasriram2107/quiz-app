import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreatePopup.css";

const CreatePopup = ({ onClose }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleNavigation = (path) => {
    onClose(); // Close popup
    navigate(path); // Navigate to the selected page
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h2 className="popup-title">What would you like to create?</h2>
        <p className="popup-subtext">1 / 20 Quizzes and Lessons Created</p>

        <div className="popup-options">
          <div
            className="option"
            onClick={() => handleNavigation("/assignments")}
          >
            <span className="icon">📘</span>
            <div>
              <strong>Assignment</strong>
              <p>
                Review and practice quizzes to reflect on student understanding.
              </p>
            </div>
          </div>

          {/* ✅ Add navigation for Lessons */}
          <div className="option" onClick={() => handleNavigation("/lessons")}>
            <span className="icon">📖</span>
            <div>
              <strong>Lesson</strong>
              <p>Teach new topics or skills with interactive slides.</p>
            </div>
          </div>

          {/* <div className="option" onClick={() => handleNavigation("/interactive-videos")}>
          <div className="option">
            <span className="icon">🎥</span>
            <div>
              <strong>Interactive Video</strong>
              <p>Make assignments more engaging with videos.</p>
            </div>
          </div> */}
          {/* </div> */}

          <div
            className="option"
            onClick={() => handleNavigation("/flashcard-page")}
          >
            <div className="option">
              <span className="icon">📋</span>
              <div>
                <strong>Flashcard</strong>
                <p>Boost memory retention through interactive flashcards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePopup;
