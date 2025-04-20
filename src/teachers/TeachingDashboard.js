import React from "react";
import "../styles/TeachingDashboard.css";

const TeachingDashboard = () => {
  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <img src="logo.png" alt="Logo" className="logo" />
        <button className="enter-code">Enter Code</button>
      </nav>
      <h2 className="dashboard-title">What are you teaching today?</h2>
      <div className="dashboard-cards">
        <div className="card">
          <button className="create-button">+ Create</button>
        </div>
        <div className="card">
          <h3>For You</h3>
          <p>Recent Activities</p>
        </div>
        <div className="card">
          <h3>Assessment</h3>
          <button className="action-button">Upload File</button>
          <button className="action-button">Import from Drive</button>
        </div>
        <div className="card">
          <h3>Lesson</h3>
          <p>Trending Lessons:</p>
          <ul>
            <li>Numbers</li>
            <li>Algebra</li>
            <li>Geometry</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeachingDashboard;
