import React, { useState } from "react";
import "./questionadd.css";

const Questionadd = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [questionType, setQuestionType] = useState(""); // Added state for question type
  const [answer, setAnswer] = useState("");

  const handleAddQuestion = () => {
    if (currentQuestion.trim() && (questionType === "mcq" ? options.every(option => option.trim()) : answer.trim())) {
      setQuestions([...questions, { question: currentQuestion, options, answer }]);
      setCurrentQuestion("");
      setOptions(["", "", "", ""]);
      setAnswer(""); // Reset answer field
      setQuestionType(""); // Reset question type
    }
  };

  return (
    <div className="dashboard-container">
      <button className="new-exam-button">New Exam</button>
      <div className="teacher-info">
        <h2>Akib Sadman</h2>
        <p>Course: CSE</p>
      </div>
      <div className="question-type">
        <select className="dropdown" onChange={(e) => setQuestionType(e.target.value)} value={questionType}>
          <option value="">Select Question Type</option>
          <option value="mcq">Multiple Choice</option>
          <option value="short-answer">Short Answer</option>
        </select>
      </div>
      <div className="questions-container">
        <input
          type="text"
          placeholder="Type your question here..."
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          className="question-input"
        />
        {questionType === "mcq" && options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={options[index]}
            onChange={(e) =>
              setOptions(
                options.map((opt, i) => (i === index ? e.target.value : opt))
              )
            }
            className="option-input"
          />
        ))}
        {questionType === "short-answer" && (
          <textarea
            placeholder="Type the answer here (200 words)"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="answer-input"
          />
        )}
        <button onClick={handleAddQuestion} className="add-question-button">
          Add Question
        </button>
        {questionType && (
          <button className="save-button" onClick={handleAddQuestion}>
            Save Question
          </button>
        )}
      </div>
      <div className="added-questions">
        {questions.map((q, index) => (
          <div key={index} className="question-box">
            <p>{q.question}</p>
            {q.options && q.options.map((option, i) => (
              <span key={i} className="option-box">{option}</span>
            ))}
            {q.answer && <span className="answer-box">{q.answer}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questionadd;