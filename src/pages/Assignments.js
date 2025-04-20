import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import "../styles/Assignments.css";
import importIcon from "../images/import-icon.png";
import aiIcon from "../images/ai-icon.png";
//import scratchIcon from "../images/scratch-icon.png";

const Assignments = () => {
  const navigate = useNavigate(); // Use navigate function

  return (
    <div className="assignments-container">
      {/* Back Button & Title in the same div */}
      <div className="header-container">
        <h2 className="title">Create a new activity</h2>
      </div>

      <div className="activity-options">
        <div
          className="activity-card"
          onClick={() => navigate("/import-worksheets")}
        >
          <img src={importIcon} alt="Import Worksheets" />
          <h3>Import worksheets/questions</h3>
          <p>from documents, google form, spreadsheet</p>
        </div>

        <div className="activity-card" onClick={() => navigate("/generate-ai")}>
          <img src={aiIcon} alt="Generate with AI" />
          <h3>Generate with AI</h3>
          <p>from documents, websites, text</p>
        </div>

        <div
          className="activity-card"
          onClick={() =>
            navigate("/import-worksheets", { state: { tab: "paste" } })
          }
        >
          {/* <img src={scratchIcon} alt="Create from Scratch" />
          <h3>Create from scratch</h3>
          <p>from search, question types</p> */}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
