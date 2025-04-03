// backend/routes/enrollment.js
const express = require("express");
const { enrollStudent, getEnrolledCourses } = require("../controllers/enrollmentController");
const authenticate = require("../middleware/authMiddleware");  // Protect the routes with authentication middleware
const router = express.Router();

// Protected route to enroll a student in a course
router.post("/enroll", authenticate, enrollStudent);  // Enroll student in a course

// Protected route to get all courses a student is enrolled in
router.get("/courses", authenticate, getEnrolledCourses);  // Get courses for a student

module.exports = router;
