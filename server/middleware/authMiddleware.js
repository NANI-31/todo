// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode and verify token
    req.user = decoded.user; // Attach the user info to the request
    next(); // Proceed to the next middleware
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
