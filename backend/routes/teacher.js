// backend/routes/teacher.js
const express = require("express");
const { createCourse, getCourses, getExamsForCourse, addExam } = require("../controllers/teacherController");
const authenticate = require("../middleware/authMiddleware");  // Protect the routes with authentication middleware
const router = express.Router();

// Protected routes for teacher
router.post("/course", authenticate, createCourse);  // Create a new course
router.get("/courses", authenticate, getCourses);    // Get all courses taught by the teacher
router.get("/exams/:courseId", authenticate, getExamsForCourse);  // Get exams for a specific course
router.post("/exam", authenticate, addExam);         // Add a new exam for a course

module.exports = router;
// backend/routes/teacher.js