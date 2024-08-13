import React, { useState, useEffect } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { FaSearch } from "react-icons/fa";

function AllBlog() {
  const { user } = useSelector((state) => state?.auth);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blog/blogs");
        setBlogs(response?.data || []);
      } catch (err) {
        setError("Failed to fetch blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-[#6D64F2] to-black">
      <div className="container px-4 py-12 mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:text-5xl text-2xl font-extrabold text-center text-white sm:mb-12"
        >
          Explore Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
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
              className="w-full px-4 py-2 text-white placeholder-gray-300 bg-white rounded-full bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <FaSearch className="absolute text-pink-500 right-3 top-3" />
          </div>
        </motion.div>
        <AnimatePresence>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <BlogCard blog={blog} user={user} />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="text-center text-gray-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                No blogs found matching your search.
              </motion.div>
            )}
          </Masonry>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AllBlog;
