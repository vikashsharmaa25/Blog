import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({
        success: false,
        message: "Invalid user",
      });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      console.log("Token verification failed");
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log("Authentication error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied, admin only",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
