import React, { useEffect, useState } from "react";
import "../styles/ScoresPage.css"; // Import your CSS file for styling

const ScoresPage = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/scores");
      if (!response.ok) throw new Error("Failed to fetch scores");
      const data = await response.json();
      setScores(data);
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  const deleteScore = async (id) => {
    if (!window.confirm("Are you sure you want to delete this score?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/scores/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setScores(scores.filter((score) => score._id !== id));
      } else {
        console.error("Failed to delete score");
      }
    } catch (error) {
      console.error("Error deleting score:", error);
    }
  };

  return (
    <div className="scores-container">
      <h2>Student Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.department}</td>
              <td>{student.score}%</td>
              <td>
                <button onClick={() => deleteScore(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoresPage;
