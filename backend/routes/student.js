// backend/routes/student.js
const express = require("express");
const { getCourses, getExams } = require("../controllers/studentController");
const authenticate = require("../middleware/authMiddleware");  // Protect the routes with authentication middleware
const router = express.Router();

// Protected route to get the courses the student is enrolled in
router.get("/courses", authenticate, getCourses);  // Calls getCourses from studentController

// Protected route to get the upcoming exams for the student
router.get("/exams", authenticate, getExams);      // Calls getExams from studentController

module.exports = router;
