import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EnterDetails.css";

function EnterDetails() {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (studentName.trim() && department.trim() && email.trim()) {
      try {
        const response = await fetch("http://localhost:5000/api/students", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: studentName,
            department,
            email,
          }),
        });

        if (response.ok) {
          console.log("Student details saved successfully!");
          navigate("/enter-code"); // Navigate only after successful save
        } else {
          console.error("Failed to save student details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="enter-details-container">
      <div className="enter-details-card">
        <h2>Enter Your Details</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your mail ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn primary1">
            Enter Code
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnterDetails;
