const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure emails are unique
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email address."]
  },
  password: {
    type: String,
    required: true,  // Password is required
  },
  name: {
    type: String,
    required: true,  // Name is required
  },
  role: {
    type: String,
    required: true,
    enum: ["student", "teacher"],  // Role must be either "student" or "teacher"
  },
  department: {
    type: String,
    default: "",  // Department is optional for users, but a default empty string is provided
  }
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Create and export the User model
module.exports = mongoose.model("User", userSchema);
