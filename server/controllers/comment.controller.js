import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";

// Add a comment to a blog
export const addComment = async (req, res) => {
  try {
    const { blogId, comment } = req.body;
    const userId = req.userId;

    const newComment = new Comment({
      blog: blogId,
      user: userId,
      comment,
    });

    await newComment.save();
    await Blog.findByIdAndUpdate(blogId, {
      $push: { comments: newComment._id },
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
