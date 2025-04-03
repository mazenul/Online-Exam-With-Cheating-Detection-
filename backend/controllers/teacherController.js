// backend/controllers/teacherController.js
const Course = require("../models/Course");
const Exam = require("../models/Exam");
const User = require("../models/User");

// **Create Course**: Handle course creation by teacher
exports.createCourse = async (req, res) => {
  const { name, department } = req.body;
  const teacherId = req.user.userId;  // Extract teacher's userId from JWT token

  // Validate required fields
  if (!name || !department) {
    return res.status(400).json({ msg: "Please provide all required fields (name, department)." });
  }

  try {
    // Create a new course
    const newCourse = new Course({
      name,
      department,
      teacherId
    });

    // Save the course to the database
    await newCourse.save();
    res.status(201).json({ msg: "Course created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// **Get All Courses**: Fetch all courses taught by the teacher
exports.getCourses = async (req, res) => {
  const teacherId = req.user.userId;  // Extract teacher's userId from JWT token

  try {
    // Find all courses that the teacher is associated with
    const courses = await Course.find({ teacherId });

    if (!courses || courses.length === 0) {
      return res.status(404).json({ msg: "No courses found for this teacher" });
    }

    // Return the list of courses
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// **Get Exams for a Course**: Fetch all exams for a given course
exports.getExamsForCourse = async (req, res) => {
  const { courseId } = req.params;  // Extract courseId from URL params
  const teacherId = req.user.userId;  // Extract teacher's userId from JWT token

  try {
    // Find the course the teacher is associated with
    const course = await Course.findOne({ _id: courseId, teacherId });
    if (!course) {
      return res.status(404).json({ msg: "Course not found or you are not the teacher" });
    }

    // Find exams for this course
    const exams = await Exam.find({ courseId }).populate("students");  // Populate students for the exam

    if (!exams || exams.length === 0) {
      return res.status(404).json({ msg: "No exams found for this course" });
    }

    // Return the list of exams
    res.json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// **Add Exam**: Teacher can create and schedule an exam for a course
exports.addExam = async (req, res) => {
  const { courseId, subject, date, time } = req.body;
  const teacherId = req.user.userId;  // Extract teacher's userId from JWT token

  // Validate required fields
  if (!courseId || !subject || !date || !time) {
    return res.status(400).json({ msg: "Please provide all required fields (courseId, subject, date, time)." });
  }

  try {
    // Ensure the teacher is the one teaching this course
    const course = await Course.findOne({ _id: courseId, teacherId });
    if (!course) {
      return res.status(404).json({ msg: "Course not found or you are not the teacher of this course" });
    }

    // Create the new exam
    const newExam = new Exam({
      subject,
      date,
      time,
      courseId,
    });

    // Save the exam to the database
    await newExam.save();
    res.status(201).json({ msg: "Exam created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
