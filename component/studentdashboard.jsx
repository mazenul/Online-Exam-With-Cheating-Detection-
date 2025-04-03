import React from "react";
import "./studentdashboard.css"; // Import the CSS file

const StudentDashboard = () => {
  const teacher = {
    name: "Akib Sadman ",
    course: "Cse 331",
  };

  const exams = [
    { subject: "Mathematics", date: "March 25, 2025", time: "10:00 AM" },
    { subject: "Physics", date: "March 27, 2025", time: "2:00 PM" },
    { subject: "Chemistry", date: "March 29, 2025", time: "11:00 AM" },
  ];

  return (
    <div className="dashboard-container">
      {/* Teacher Details */}
      <div className="teacher-details">
        <h2>{teacher.name}</h2>
        <p>Course: {teacher.course}</p>
      </div>

      {/* Exam Schedule */}
      <div className="exam-schedule">
        <h3>Upcoming Exams</h3>
        {exams.map((exam, index) => (
          <div className="exam-card" key={index}>
            <h4>{exam.subject}</h4>
            <p>Date: {exam.date}</p>
            <p>Time: {exam.time}</p>
            <button className="join-btn">Join</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
