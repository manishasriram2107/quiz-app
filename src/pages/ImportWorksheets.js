import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/ImportWorksheets.css";

const ImportWorksheets = () => {
  const [activeTab, setActiveTab] = useState("document");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Check for location.state.quiz on component mount
  useEffect(() => {
    console.log("📥 Checking location state:", location.state);

    if (location.state?.tab === "paste") {
      console.log("🔄 Switching to Paste Questions tab");
      setActiveTab("paste"); // Switch to Paste Questions tab
    }

    if (location.state?.quiz) {
      console.log("✅ Received quiz data:", location.state.quiz);
      setQuiz(location.state.quiz);
    }
  }, [location.state]);

  const handleUploadClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf";
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      setUploadedFile(file.name);
      console.log("📂 File selected:", file.name);

      const formData = new FormData();
      formData.append("file", file);

      setUploading(true);
      setQuiz([]);

      try {
        const response = await fetch("http://127.0.0.1:8000/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.detail || "Upload failed");
        }

        const result = await response.json();
        console.log("✅ Quiz generated successfully:", result);

        const questionsArray = result.quiz
          .split("\n")
          .filter((q) => q.trim() !== "");
        setQuiz(questionsArray);
      } catch (error) {
        console.error("❌ Error:", error);
        alert(`Error: ${error.message}`);
      } finally {
        setUploading(false);
      }
    };
    fileInput.click();
  };

  const handleDelete = (index) => {
    const updatedQuiz = quiz.filter((_, i) => i !== index);
    setQuiz(updatedQuiz);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditText(quiz[index]);
  };

  const handleSaveEdit = () => {
    const updatedQuiz = [...quiz];
    updatedQuiz[editingIndex] = editText;
    setQuiz(updatedQuiz);
    setEditingIndex(null);
  };

  const handleSubmit = () => {
    if (quiz.length === 0) {
      alert("⚠ No questions to submit!");
      return;
    }
    console.log("🚀 Navigating with Quiz Data:", [...quiz]); // Debugging log
    navigate("/review-questions", { state: { quiz: [...quiz] } });
  };

  return (
    <div className="import-wrapper">
      <div className="sidebar">
        <h3>Start from</h3>
        <ul>
          <li className="active">📄 Import worksheets</li>
          <li>⭐ Generate with AI</li>
          <li>✏ Create from scratch</li>
        </ul>
      </div>

      <div className="import-container">
        <div className="tab-bar">
          <span
            className={activeTab === "document" ? "active" : ""}
            onClick={() => setActiveTab("document")}
          >
            📂 Document
          </span>
          <span
            className={activeTab === "paste" ? "active" : ""}
            onClick={() => setActiveTab("paste")}
          >
            ✏ Paste Questions
          </span>
        </div>

        {activeTab === "document" && (
          <div className="upload-section">
            <h2>Extract questions from worksheets/question bank</h2>
            <div className="upload-box">
              <button
                className="upload-btn"
                onClick={handleUploadClick}
                disabled={uploading}
              >
                {uploading ? "📤 Uploading..." : "📤 Upload from device"}
              </button>
            </div>

            {quiz.length > 0 ? (
              <div className="quiz-output">
                <h3>Generated Quiz:</h3>
                <ul className="quiz-list">
                  {quiz.map((question, index) => (
                    <li key={index} className="quiz-item">
                      <div className="quiz-text">
                        {editingIndex === index ? (
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="edit-input"
                          />
                        ) : (
                          <span>{question}</span>
                        )}
                      </div>

                      <div className="quiz-actions">
                        {editingIndex === index ? (
                          <button className="save-btn" onClick={handleSaveEdit}>
                            ✅ Save
                          </button>
                        ) : (
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(index)}
                          >
                            ✏ Edit
                          </button>
                        )}
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(index)}
                        >
                          ❌ Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <button className="submit-btn" onClick={handleSubmit}>
                  🚀 Submit
                </button>
              </div>
            ) : (
              <p>No questions available. Upload a file or paste manually.</p>
            )}

            {uploadedFile && (
              <div className="file-info">
                <p>📄 {uploadedFile}</p>
              </div>
            )}

            <p>Supported formats: PDF (Max: 25MB, 30 pages)</p>
          </div>
        )}

        {activeTab === "paste" && (
          <div className="paste-questions-section">
            <h2>Paste questions manually</h2>
            <textarea
              className="paste-textarea"
              placeholder="Paste your questions here..."
            ></textarea>
            <button className="generate-quiz-btn">🛠 Generate Quiz</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportWorksheets;
