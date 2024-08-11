import Blog from "../models/blog.model.js";
import cloudinary from "../utils/cloudinary.js";
import getUserDataUri from "../utils/dataUri.js";

// Create a new blog (Admin only)
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Handle image upload if a file is provided
    let coverImage = "";
    if (req.file) {
      const fileUri = getUserDataUri(req.file);
      const uploadResult = await cloudinary.uploader.upload(fileUri);
      coverImage = uploadResult.secure_url;
    }

    const blog = new Blog({
      title,
      content,
      coverImage,
    });

    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    let coverImage = req.body.coverImage;
    if (req.file) {
      const fileUri = getUserDataUri(req.file);
      const uploadResult = await cloudinary.uploader.upload(fileUri);
      coverImage = uploadResult.secure_url;
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, content, coverImage },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
