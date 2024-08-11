import React, { useState, useEffect } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import { FaHeart, FaComment, FaClock } from "react-icons/fa";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function AllBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blog/blogs");
        setBlogs(response?.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blogs. Please try again later.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-800">
        Explore Our <span className="text-indigo-600">Blog Collection</span>
      </h1>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </Masonry>
    </div>
  );
}

function BlogCard({ blog }) {
  const navigate = useNavigate();
  const clickHandler = (id) => {
    // console.log(id);
    navigate(`/blog/${id}`);
  };
  return (
    <motion.div
      className="mb-4 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2
          onClick={() => clickHandler(blog?._id)}
          className="text-2xl font-bold mb-3 text-gray-800 cursor-pointer"
        >
          {blog.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.1, color: "#e53e3e" }}
          >
            <FaHeart className="mr-1" />
            <span>{blog.likes}</span>
          </motion.div>
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.1, color: "#3182ce" }}
          >
            <FaComment className="mr-1" />
            <span>{blog.comments.length}</span>
          </motion.div>
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.1, color: "#38a169" }}
          >
            <FaClock className="mr-1" />
            <span>{format(new Date(blog.createdAt), "MMM d, yyyy")}</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
}

export default AllBlog;
