import React, { useState } from "react";
import "./studentdashboard2.css";

const StudentDashboard= () => {
  const [search, setSearch] = useState("");
  const [enrolled, setEnrolled] = useState([]);
  const teachers = ["CSE323", "CSE311", "CSE299", "CSE327"];

  const handleEnroll = (teacher) => {
    if (!enrolled.includes(teacher)) {
      setEnrolled([...enrolled, teacher]);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="student-info">
        <h2>Student Info</h2>
        <p>Name: AKib Sadman</p>
        <p>ID: 123456</p>
      </div>

      <div className="new-enroll">
        <input
          type="text"
          placeholder="Search Teacher/Subject"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-results">
          {teachers
            .filter((teacher) =>
              teacher.toLowerCase().includes(search.toLowerCase())
            )
            .map((teacher, index) => (
              <button key={index} className="teacher-button" onClick={() => handleEnroll(teacher)}>
                {teacher}
              </button>
            ))}
        </div>
      </div>

      <div className="enrolled-section">
        <h3>Enrolled:</h3>
        <div className="enrolled-list">
          {enrolled.map((teacher, index) => (
            <div key={index} className="teacher-card">{teacher}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
