// backend/routes/auth.js
const express = require("express");
const { signup, login } = require("../controllers/authController");
const router = express.Router();

// Route to handle user signup
router.post("/signup", signup);  // POST request for signup

// Route to handle user login
router.post("/login", login);    // POST request for login

module.exports = router;
