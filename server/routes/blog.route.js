import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/isAuth.js";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  updateBlog,
} from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.js";
import { toggleLike } from "../controllers/like.controller.js";
import { addComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post(
  "/create",
  isAuthenticated,
  isAdmin,
  upload.single("coverImage"),
  createBlog
);

router.get("/blogs", getBlogs);

router.get("/blogs/:id", getBlogById);

router.put(
  "/blogs/:id",
  isAuthenticated,
  isAdmin,
  upload.single("coverImage"),
  updateBlog
);

router.delete("/blogs/:id", isAuthenticated, isAdmin, deleteBlog);

// Like routes
router.post("/like", isAuthenticated, toggleLike);

// Comment routes
router.post("/comment", isAuthenticated, addComment);

export default router;
