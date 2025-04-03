import React from "react";
import "./teacherdashboard.css";

const TeacherDashboard = () => {
  const teacherName = "Akib Sadman";
  const courseName = "CSE";

  return (
    <div className="dashboard-container">
      <div className="teacher-info">
        <h2>{teacherName}</h2>
        <p>Course: {courseName}</p>
      </div>
      <div className="exam-sections">
        <div className="exam-section">
          <div className="section-title">Running</div>
          <button className="exam-button">Running Exam</button>
          <button className="exam-button">Running Exam</button>
          <button className="exam-button">Running Exam</button>
        </div>
        <div className="exam-section">
          <div className="section-title">Previous</div>
          <button className="exam-button">Running Exam</button>
          <button className="exam-button">Running Exam</button>
          <button className="exam-button">Running Exam</button>
        </div>
      </div>
      <button className="add-exam-button">Add Exam</button>
    </div>
  );
};

export default TeacherDashboard;
