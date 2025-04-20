import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StudentRecords.css";
import { format } from "date-fns";

const StudentRecords = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div className="student-records">
      <h2>Student Records</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Time of Entry</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.department}</td>
              <td>{student.email}</td>
              <td>
                {format(new Date(student.createdAt), "dd/MM/yyyy HH:mm:ss")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to navigate to Scores Page */}
      <button
        onClick={() => navigate("/scores-page")}
        className="view-scores-btn"
      >
        View Student Scores
      </button>
    </div>
  );
};

export default StudentRecords;
