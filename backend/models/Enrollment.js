// backend/models/Enrollment.js
const mongoose = require("mongoose");

// Define the Enrollment schema
const enrollmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Reference to the User model (student)
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",  // Reference to the Course model
    required: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Create the Enrollment model from the schema
module.exports = mongoose.model("Enrollment", enrollmentSchema);
