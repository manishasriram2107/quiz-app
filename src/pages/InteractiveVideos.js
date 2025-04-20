import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/InteractiveVideos.css"; // Import the CSS file

const InteractiveVideos = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate(); // Initialize navigation

  // Upload Handler
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideos((prevVideos) => [...prevVideos, { title: file.name, url: videoURL }]);
    }
  };

  return (
    <div className="page-container">
      {/* Back Button Redirecting to TeachingDashboard */}
      <button className="back-btn" onClick={() => navigate("/teaching-dashboard")}>
        🔙 Back
      </button>

      <h2>🎥 Interactive Videos</h2>
      <p>Upload and explore engaging learning videos.</p>

      {/* Upload Section */}
      <label className="upload-btn">
        Upload Video
        <input type="file" accept="video/mp4,video/webm,video/ogg" onChange={handleUpload} />
      </label>

      {/* My Videos Section */}
      <div className="my-videos">
        <h3>📁 My Videos</h3>
        {videos.length === 0 ? (
          <p className="no-videos">No videos uploaded yet.</p>
        ) : (
          videos.map((video, index) => (
            <div key={index} className="video-item">
              <p>{video.title}</p>
              <video controls width="100%">
                <source src={video.url} type="video/mp4" />
                <source src={video.url} type="video/webm" />
                Your browser does not support this video format.
              </video>
            </div>
          ))
        )}
      </div>

      {/* Top 3 Videos Section */}
      <div className="video-section">
        <h3>🚀 Top Videos</h3>
        <div className="video-grid">
          <iframe src="https://www.youtube.com/embed/3hF0Rym8FvM" title="Quantum Mechanics" allowFullScreen></iframe>
          <iframe src="https://www.youtube.com/embed/HZ3zAlyXvYg" title="Machine Learning Basics" allowFullScreen></iframe>
          <iframe src="https://www.youtube.com/embed/RR0RwmwtqkU" title="Web Development Crash Course" allowFullScreen></iframe>
        </div>
      </div>

      {/* Recommended Videos Section */}
      <div className="video-section">
        <h3>🔥 Recommended Videos</h3>
        <div className="video-grid">
          <iframe src="https://www.youtube.com/embed/KxptsK_1xFs" title="Newton’s Laws of Motion" allowFullScreen></iframe>
          <iframe src="https://www.youtube.com/embed/zOjov-2OZ0E" title="Introduction to Coding" allowFullScreen></iframe>
          <iframe src="https://www.youtube.com/embed/W6NZfCO5SIk" title="JavaScript Basics" allowFullScreen></iframe>
        </div>
      </div>

      {/* Popular Videos Section */}
      <div className="video-section">
        <h3>⭐ Popular Videos</h3>
        <div className="video-grid">
          <iframe src="https://www.youtube.com/embed/jRUL3xJvHnM" title="Science Experiments" allowFullScreen></iframe>
          <iframe src="https://www.youtube.com/embed/pKKDluIwwsA" title="Data Structures Explained" allowFullScreen></iframe>
          <iframe src="https://www.youtube.com/embed/Q9MtlmmN1Q4" title="AI in Everyday Life" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  );
};

export default InteractiveVideos;
