import React, { useState, useEffect } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaComment, FaClock, FaSearch, FaUser } from "react-icons/fa";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function AllBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold mb-12 text-center text-white"
        >
          Explore Our{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
            Blog Collection
          </span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <FaSearch className="absolute right-3 top-3 text-white" />
          </div>
        </motion.div>
        <AnimatePresence>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </Masonry>
        </AnimatePresence>
      </div>
    </div>
  );
}

function BlogCard({ blog }) {
  const navigate = useNavigate();
  const clickHandler = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <motion.div
      className="mb-8 bg-gray-900 backdrop-filter backdrop-blur-lg bg-opacity-30 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="relative">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-52 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h2
            onClick={() => clickHandler(blog?._id)}
            className="text-2xl font-bold mb-2 text-white cursor-pointer hover:text-yellow-400 transition-colors duration-300 line-clamp-2"
          >
            {blog.title}
          </h2>
          <div className="flex items-center text-sm text-gray-300">
            <FaUser className="mr-2" />
            <span>{blog.author}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-300 mb-6 line-clamp-3">{blog.content}</p>
        <div className="flex justify-between items-center text-sm text-gray-400 border-t border-gray-700 pt-4">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.1, color: "#f56565" }}
          >
            <FaHeart className="mr-2" />
            <span>{blog.likes}</span>
          </motion.div>
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.1, color: "#4299e1" }}
          >
            <FaComment className="mr-2" />
            <span>{blog.comments.length}</span>
          </motion.div>
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.1, color: "#48bb78" }}
          >
            <FaClock className="mr-2" />
            <span>{format(new Date(blog.createdAt), "MMM d, yyyy")}</span>
          </motion.div>
        </div>
      </div>
      <motion.button
        className="w-full bg-gradient-to-r from-pink-500 via-yellow-500 to-orange-500 text-gray-900 font-semibold py-3 text-center hover:from-orange-500 hover:via-yellow-400 hover:to-pink-500 transition-colors duration-300"
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        onClick={() => clickHandler(blog?._id)}
      >
        Read More
      </motion.button>
    </motion.div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <motion.div
        className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{message}</span>
      </motion.div>
    </div>
  );
}

export default AllBlog;
