import express from "express";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  editProfile,
} from "../controllers/user.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// User registration route
router.route("/register").post(registerUser);

// User login route
router.route("/login").post(loginUser);

// User logout route
router.route("/logout").get(isAuthenticated, logoutUser);

// Get user profile route
router.route("/profile/:id").get(isAuthenticated, getProfile);

// Edit user profile route
router
  .route("/profile/edit")
  .put(isAuthenticated, upload.single("profilePicture"), editProfile);

// admin test
router.get("/test", isAuthenticated, isAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: " this is protected route",
  });
});

export default router;
