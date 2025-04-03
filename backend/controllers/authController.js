// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";  // JWT Secret key (should be stored in environment variables)

// **Signup Logic**: Handle user registration
exports.signup = async (req, res) => {
  const { email, password, name, role, department } = req.body;

  // Basic validation for required fields
  if (!email || !password || !name || !role || !department) {
    return res.status(400).json({ msg: "Please provide all required fields (email, password, name, role, department)." });
  }

  // Email format validation (simple regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: "Invalid email format." });
  }

  // Password validation (minimum 6 characters)
  if (password.length < 6) {
    return res.status(400).json({ msg: "Password must be at least 6 characters long." });
  }

  // Role validation (must be either "student" or "teacher")
  if (!["student", "teacher"].includes(role)) {
    return res.status(400).json({ msg: "Role must be either 'student' or 'teacher'." });
  }

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save a new user in the database
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      role,
      department,
    });

    await newUser.save();
    // Send a success message along with the user's data (excluding password)
    res.status(201).json({ msg: "User registered successfully", user: { email: newUser.email, name: newUser.name, role: newUser.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error, please try again later." });
  }
};

// **Login Logic**: Handle user login and JWT token generation
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation for required fields
  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide both email and password." });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // If credentials are correct, create a payload for JWT
    const payload = {
      userId: user._id,
      role: user.role,
    };

    // Generate the JWT token (expires in 1 hour)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // Send the token back to the frontend
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error, please try again later." });
  }
};
