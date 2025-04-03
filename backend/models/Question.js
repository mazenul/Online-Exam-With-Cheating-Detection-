// backend/models/Question.js
const mongoose = require("mongoose");

// Define the Question schema
const questionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",  // Reference to the Exam model (which exam the question belongs to)
    required: true,  // Question must belong to an exam
  },
  questionText: {
    type: String,
    required: true,  // The text of the question
  },
  options: [{
    type: String,  // The options for multiple choice questions
  }],
  correctAnswer: {
    type: String,
    required: true,  // The correct answer to the question
  },
  questionType: {
    type: String,
    required: true,
    enum: ["multiple_choice", "short_answer"],  // Question can be multiple_choice or short_answer
  }
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Create the Question model from the schema
module.exports = mongoose.model("Question", questionSchema);
