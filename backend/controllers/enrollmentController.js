// backend/controllers/enrollmentController.js
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const User = require("./models/User");  // Adjust path if necessary Correct path for importing User model

// Example function for enrolling a student
exports.enrollStudent = async (req, res) => {
  const { courseId } = req.body;
  const studentId = req.user.userId;  // Extract student ID from JWT token

  try {
    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // Check if the student is already enrolled in this course
    const existingEnrollment = await Enrollment.findOne({ studentId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ msg: "Student is already enrolled in this course" });
    }

    // Create the new enrollment
    const newEnrollment = new Enrollment({
      studentId,
      courseId,
    });

    // Save the enrollment to the database
    await newEnrollment.save();
    res.status(201).json({ msg: "Student successfully enrolled in the course" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
