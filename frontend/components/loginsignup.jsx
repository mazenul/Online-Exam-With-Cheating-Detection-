import React, { useState } from 'react';
import './lnoginsignup.css';

const Loginsignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login form submitted");
    } else {
      console.log(`Signup form submitted as ${role}`);
    }
  };

  return (
    <div className="app">
      <div className="form-container">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label>NSU ID</label>
                <input type="text" placeholder="Enter your NSU ID" required />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input type="text" placeholder="Enter your Department" required />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            </>
          )}
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="submit-button">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={toggleForm} className="toggle-link">
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Loginsignup;
