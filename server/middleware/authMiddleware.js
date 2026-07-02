import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No Token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided.",
      });
    }

    // Debug Logs
    console.log("Authorization Header:", req.headers.authorization);
    console.log("Token:", token);
    console.log("JWT Secret:", process.env.JWT_SECRET);

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decoded);

    // Find User
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next();

  } catch (error) {
    console.log("JWT Error:", error);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};