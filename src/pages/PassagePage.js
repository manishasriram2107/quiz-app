import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PassagePage.css";

const PassagePage = () => {
  const navigate = useNavigate();
  const [passages, setPassages] = useState([]);

  const [newPassage, setNewPassage] = useState({ title: "", content: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  // Load saved passages from localStorage when the component mounts
  useEffect(() => {
    const savedPassages = localStorage.getItem("passages");
    if (savedPassages) {
      setPassages(JSON.parse(savedPassages));
    }
  }, []);

  // Save passages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("passages", JSON.stringify(passages));
  }, [passages]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPassage((prev) => ({ ...prev, [name]: value }));
  };

  // Add or Update Passage
  const handleSave = () => {
    let updatedPassages;
    if (editingIndex !== null) {
      updatedPassages = passages.map((passage, index) =>
        index === editingIndex ? newPassage : passage
      );
      setEditingIndex(null);
    } else {
      updatedPassages = [...passages, newPassage];
    }
    setPassages(updatedPassages);
    setNewPassage({ title: "", content: "" });
  };

  // Edit Passage
  const handleEdit = (index) => {
    setNewPassage(passages[index]);
    setEditingIndex(index);
  };

  // Delete Passage
  const handleDelete = (index) => {
    const updatedPassages = passages.filter((_, i) => i !== index);
    setPassages(updatedPassages);
  };

  return (
    <div className="page-container">
      <button className="back-btn" onClick={() => navigate("/teaching-dashboard")}>🔙 Back</button>
      <h2>📖 Passage Management</h2>

      {/* Form for Adding/Editing Passage */}
      <div className="passage-form">
        <input
          type="text"
          name="title"
          placeholder="Enter passage title"
          value={newPassage.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Enter passage content"
          value={newPassage.content}
          onChange={handleChange}
        />
        <button onClick={handleSave}>{editingIndex !== null ? "Update" : "Add"} Passage</button>
      </div>

      {/* Display Passages */}
      <div className="passage-list">
        {passages.length === 0 ? (
          <p className="no-passages">No passages added yet.</p>
        ) : (
          passages.map((passage, index) => (
            <div key={index} className="passage-item">
              <h3>{passage.title}</h3>
              <p>{passage.content}</p>
              <div className="buttons">
                <button onClick={() => handleEdit(index)}>✏️ Edit</button>
                <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PassagePage;
