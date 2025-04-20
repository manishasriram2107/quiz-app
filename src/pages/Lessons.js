import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import "../styles/Lessons.css";
import importIcon from "../images/import-icon.png";
import scratchIcon from "../images/scratch-icon.png";

const Lessons = () => {
  const navigate = useNavigate(); // Use navigate function

  return (
    <div className="lessons-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h2 className="title">Create a new lesson</h2>

      <div className="lesson-options">
        <div
          className="lesson-card"
          onClick={() => navigate("/import-worksheets")}
        >
          <img src={importIcon} alt="Import Slides" />
          <h3>Import Slides</h3>
          <p>from PowerPoint, PDFs, and documents</p>
        </div>

        <div className="lesson-card" onClick={() => navigate("/create-lesson")}>
          <img src={scratchIcon} alt="Create from Scratch" />
          <h3>Create from Scratch</h3>
          <p>Build interactive lessons manually</p>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
