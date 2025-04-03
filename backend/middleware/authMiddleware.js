// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";  // Secret key for JWT

// Middleware to authenticate JWT token
const authenticate = (req, res, next) => {
  // Get the token from the Authorization header (format: "Bearer <token>")
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token is provided, return Unauthorized error
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;  // Contains { userId, role, etc. }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authenticate;
