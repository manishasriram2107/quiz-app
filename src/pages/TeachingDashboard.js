import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  FaSearch,
  FaHeart,
  FaClipboardList,
  FaBook,
  FaVideo,
  FaFileAlt,
  FaUserGraduate,
} from "react-icons/fa";
import CreatePopup from "./CreatePopup";
import "../styles/TeachingDashboard.css";

const TeachingDashboard = () => {
  const [activeTab, setActiveTab] = useState("For You");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  // Function to render content based on selected tab
  const renderContent = () => {
    switch (activeTab) {
      case "For You":
        return (
          <div className="grid">
            <div className="card create">
              <button className="btn" onClick={() => setIsPopupVisible(true)}>
                + Create
              </button>
            </div>
            {isPopupVisible && (
              <CreatePopup onClose={() => setIsPopupVisible(false)} />
            )}
          </div>
        );
      case "Assessments":
        return (
          <div className="grid">
            <div className="card">
              <h3>Recent Assessments</h3>
              <p>No recent assessments.</p>
            </div>
            <div className="card">
              <h3>Upload an Assessment</h3>
              <button className="btn" onClick={() => navigate("/assignments")}>
                Upload File
              </button>
              <button className="btn" onClick={() => navigate("/assignments")}>
                Create New
              </button>
            </div>
          </div>
        );
      case "Lessons":
        return (
          <div className="grid">
            <div className="card">
              <h3>My Lessons</h3>
              <p>You haven’t created any lessons yet.</p>
              <button className="btn" onClick={() => navigate("/lessons")}>
                Create a Lesson
              </button>
            </div>
            <div className="card">
              <h3>Explore Lessons</h3>
              <ul>
                <li>Mathematics Basics</li>
                <li>Science Fundamentals</li>
                <li>History of Civilizations</li>
              </ul>
            </div>
            <div className="card">
              <h3>Lessons</h3>
              <p>Trending Lessons:</p>
              <ul>
                <li>Numbers</li>
                <li>Algebra</li>
                <li>Geometry</li>
              </ul>
            </div>
          </div>
        );
      case "Interactive Videos":
        return (
          <div className="grid">
            <div className="card">
              <h3>My Interactive Videos</h3>
              <p>No videos uploaded yet.</p>
              <button
                className="btn"
                onClick={() => navigate("/interactive-videos")}
              >
                Upload Video
              </button>
            </div>
            <div className="card">
              <h3>Recommended Videos</h3>
              <ul>
                <li>Physics - Newton’s Laws</li>
                <li>Introduction to Coding</li>
                <li>World Geography</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>What are you teaching today?</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search for any topic" />
          <FaSearch className="search-icon" />
        </div>
      </header>

      <nav className="nav-tabs">
        {[
          "For You",
          "Assessments",
          "Lessons",
          //"Interactive Videos",
          //"Passages",
        ].map((tab) => (
          <div
            key={tab}
            className={"tab " + (activeTab === tab ? "active" : "")}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "For You" && <FaHeart className="tab-icon" />}
            {tab === "Assessments" && <FaClipboardList className="tab-icon" />}
            {tab === "Lessons" && <FaBook className="tab-icon" />}
            {tab === "Interactive Videos" && <FaVideo className="tab-icon" />}
            {tab === "Passages" && <FaFileAlt className="tab-icon" />}
            <span>{tab}</span>
          </div>
        ))}
      </nav>

      <main>{renderContent()}</main>

      {/* Floating Button */}
      <button
        className="floating-btn"
        onClick={() => navigate("/student-records")}
      >
        <FaUserGraduate className="floating-icon" />
      </button>
    </div>
  );
};

export default TeachingDashboard;
