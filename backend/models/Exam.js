// backend/models/Exam.js
const mongoose = require("mongoose");

// Define the Exam schema
const examSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,  // Subject of the exam (e.g., "Math", "Physics")
  },
  date: {
    type: Date,
    required: true,  // Date when the exam is scheduled
  },
  time: {
    type: String,
    required: true,  // Time when the exam will take place (e.g., "10:00 AM")
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",  // Reference to the Course model
    required: true,  // The exam must be associated with a course
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Reference to the User model (students enrolled in the exam)
  }]
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Create the Exam model from the schema
module.exports = mongoose.model("Exam", examSchema);
