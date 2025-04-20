import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EnterLessonCode.css"; // Import the CSS file

const EnterLessonCode = () => {
  const [lessonCode, setLessonCode] = useState("");
  const navigate = useNavigate();

  const handleAccessLesson = () => {
    if (!lessonCode) {
      alert("Please enter a lesson code!");
      return;
    }
    navigate(`/student-access?code=${lessonCode}`);
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Enter Lesson Code</h2>
        <input
          type="text"
          placeholder="Enter Code"
          value={lessonCode}
          onChange={(e) => setLessonCode(e.target.value)}
          className="input-field"
        />
        <button onClick={handleAccessLesson} className="submit-btn">
          Access Lesson
        </button>
      </div>
    </div>
  );
};

export default EnterLessonCode;
