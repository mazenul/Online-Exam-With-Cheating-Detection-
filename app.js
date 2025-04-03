// backend/app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");  // Authentication routes (signup/login)
const studentRoutes = require("./routes/student");  // Student-related routes
const teacherRoutes = require("./routes/teacher");  // Teacher-related routes
const enrollmentRoutes = require("./routes/enrollment");  // Enrollment routes
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Enabling Cross-Origin Resource Sharing
app.use(bodyParser.json());  // To parse JSON data in request bodies

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);  // Authentication routes for signup and login
app.use("/api/student", studentRoutes);  // Student-related routes for accessing courses, exams, etc.
app.use("/api/teacher", teacherRoutes);  // Teacher-related routes for creating courses, exams, etc.
app.use("/api/enrollment", enrollmentRoutes);  // Routes for handling enrollments (e.g., student-course associations)

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
