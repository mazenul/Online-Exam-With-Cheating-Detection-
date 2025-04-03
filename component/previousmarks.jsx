import React from "react";
import "./perq.css"; // Import the CSS file

const PreviousExam = () => {
  return (
    <div className="container">
      <div className="header">previous exam</div>
      <div className="grid">
        {Array.from({ length: 10 }).map((_, index) => (
          <React.Fragment key={index}>
            <div className="item">Student Name</div>
            <div className="item">
              <button className="btn-answer">View Answer Script</button>
            </div>
            <div className="item">Student Name</div>
            <div className="item">
              <button className="btn-answer">View Answer Script</button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PreviousExam;