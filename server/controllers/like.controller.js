import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

// Like or unlike a blog
export const toggleLike = async (req, res) => {
  try {
    const { blogId } = req.body;
    const userId = req.userId; // Assume req.userId is set by your auth middleware

    // Find the blog by its ID
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user has already liked the blog
    const isLiked = blog.likes.includes(userId);

    if (isLiked) {
      // If liked, remove the user from the blog's likes array
      blog.likes = blog.likes.filter((id) => id.toString() !== userId);

      // Also remove the blog from the user's likedBlogs array
      user.likedBlogs = user.likedBlogs.filter(
        (id) => id.toString() !== blogId
      );
    } else {
      // If not liked, add the user to the blog's likes array
      blog.likes.push(userId);

      // Also add the blog to the user's likedBlogs array
      user.likedBlogs.push(blogId);
    }

    // Save the blog and user
    await blog.save();
    await user.save();

    return res.json({
      success: true,
      message: isLiked ? "Blog unliked" : "Blog liked",
      user: user._id,
      likesCount: blog.likes.length,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
