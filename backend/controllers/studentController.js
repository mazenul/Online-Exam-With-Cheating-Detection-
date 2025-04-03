// backend/controllers/studentController.js
const Enrollment = require("../models/Enrollment");  // Import Enrollment model
const Exam = require("../models/Exam");              // Import Exam model
const Course = require("../models/Course");          // Import Course model

// **Get Enrolled Courses**: Fetch the courses the student is enrolled in
exports.getCourses = async (req, res) => {
  try {
    const userId = req.user.userId;  // Extract userId from JWT token (set by authMiddleware)

    // Find the courses that the student is enrolled in
    const enrollments = await Enrollment.find({ studentId: userId }).populate("courseId");

    // If no courses are found, return a 404 error
    if (!enrollments || enrollments.length === 0) {
      return res.status(404).json({ msg: "No courses found for this student" });
    }

    // Extract courses from the enrollments and send them as a response
    const courses = enrollments.map(enrollment => enrollment.courseId);
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// **Get Upcoming Exams**: Fetch the upcoming exams for the student
exports.getExams = async (req, res) => {
  try {
    const userId = req.user.userId;  // Extract userId from JWT token (set by authMiddleware)

    // Fetch exams that the student is enrolled in (students array in the Exam model)
    const exams = await Exam.find({
      students: userId,  // Check if the student is enrolled in the exam
      date: { $gte: new Date() }  // Only fetch upcoming exams (date >= current date)
    }).populate("courseId");  // Populate the course details in the exam response

    // If no exams are found, return a 404 error
    if (!exams || exams.length === 0) {
      return res.status(404).json({ msg: "No upcoming exams found" });
    }

    // Send the list of upcoming exams as a response
    res.json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
