import Blog from "../models/blog.model.js";

// Like or unlike a blog
export const toggleLike = async (req, res) => {
  try {
    const { blogId } = req.body;
    const userId = req.userId; // Use req.userId, which is set by your auth middleware

    // Find the blog by its ID
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    // Check if the user has already liked the blog
    const isLiked = blog.likes.includes(userId);

    if (isLiked) {
      // If liked, remove the user from the likes array (unlike the blog)
      blog.likes = blog.likes.filter((id) => id.toString() !== userId);
    } else {
      // If not liked, add the user to the likes array
      blog.likes.push(userId);
    }

    // Save the blog
    await blog.save();

    return res.json({
      success: true,
      message: isLiked ? "Blog unliked" : "Blog liked",
      likesCount: blog.likes.length,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
