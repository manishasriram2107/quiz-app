import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import "../styles/StudentAccess.css";

const StudentAccess = () => {
  const [lesson, setLesson] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const lessonCode = queryParams.get("code");

  useEffect(() => {
    if (lessonCode) {
      fetchLesson(lessonCode);
    }
  }, [lessonCode]);

  const fetchLesson = async (code) => {
    try {
      console.log("📡 Fetching lesson with code:", code);

      // ✅ Remove encoding if not needed
      const response = await axios.get(
        `http://localhost:5000/api/get-lesson/${code}`
      );

      if (response.data) {
        console.log("✅ Lesson Received:", response.data);
        setLesson(response.data);
        setError("");
      } else {
        throw new Error("Lesson not found");
      }
    } catch (err) {
      console.log("❌ Fetch Error:", err);
      setLesson(null);
      setError("Invalid lesson code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!lesson || !lesson.pdfUrl) return;
    const pdfUrl = `http://localhost:5000${lesson.pdfUrl}`;
    console.log("📂 Downloading PDF from:", pdfUrl);
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="student-access-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <h2>📖 Lesson Details</h2>

      {loading ? (
        <div className="loading">⌛ Loading lesson...</div>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="lesson-content">
          <h3>{lesson.title}</h3>

          {/* ✅ Display the notes */}
          <textarea
            className="lesson-notes"
            value={lesson.notes}
            readOnly // Make it non-editable
          />

          {lesson.pdfUrl ? (
            <button className="download-button" onClick={downloadPDF}>
              <FaDownload /> Download PDF
            </button>
          ) : (
            <p>No PDF available for this lesson.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentAccess;
