import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import "../styles/Certificate.css";

function Certificate() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name") || "Student";
  const department = queryParams.get("department") || "Department";
  const score = queryParams.get("score") || "0";

  const todayDate = new Date().toLocaleDateString();
  const certificateRef = useRef(null);

  const handleDownload = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current);
      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = `${name}_Certificate.png`;
      link.click();
    }
  };

  return (
    <div className="certificate-container">
      <div className="certificate" ref={certificateRef}>
        <div className="certificate-header">
          <h1>CERTIFICATE</h1>
          <h2>OF ACHIEVEMENT</h2>
        </div>
        <p className="certificate-text">
          This certificate is proudly presented to
        </p>
        <h2 className="certificate-name">{name}</h2>
        <p className="certificate-department">Department: {department}</p>
        <p className="certificate-score">Score: {score}%</p>
        <p className="certificate-message">
          Thank you for participating. We congratulate you on your performance!
        </p>
        <div className="certificate-footer">
          <div className="date">
            <strong>Date:</strong> {todayDate}
          </div>
        </div>
      </div>
      <button className="download-btn" onClick={handleDownload}>
        Download Certificate
      </button>
    </div>
  );
}

export default Certificate;
