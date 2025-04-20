import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreateLesson.css";

const CreateLesson = () => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [lessonCode, setLessonCode] = useState(null); // ✅ Now used properly
  const navigate = useNavigate();

  const handleCreateLesson = async () => {
    if (!title || !notes || !file) {
      alert("Please enter title, notes, and upload a file!");
      return;
    }

    const testCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    console.log("📌 Generated Test Code:", testCode);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("notes", notes);
    formData.append("file", file);
    formData.append("testCode", testCode);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/create-lesson",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("✅ Server Response:", response.data);

      // ✅ Save the lesson code to state
      setLessonCode(response.data.lesson.lessonCode);

      alert(
        `Lesson Created! Share this code: ${response.data.lesson.lessonCode}`
      );
    } catch (error) {
      console.error("❌ Error creating lesson:", error.response?.data || error);
      alert("Failed to create lesson.");
    }
  };

  return (
    <div className="create-lesson-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h2>Create a New Lesson</h2>

      <input
        type="text"
        placeholder="Lesson Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Enter Lesson Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button className="create-lesson-button" onClick={handleCreateLesson}>
        Create Lesson
      </button>

      {/* ✅ Show Lesson Code if created */}
      {lessonCode && (
        <div className="lesson-code">
          <p>Share this Lesson Code with students:</p>
          <strong>{lessonCode}</strong>
        </div>
      )}
    </div>
  );
};

export default CreateLesson;
