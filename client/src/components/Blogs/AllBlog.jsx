import React, { useState, useEffect } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaComment, FaClock, FaSearch, FaUser } from "react-icons/fa";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";

function AllBlog() {
  const [blogs, setBlogs] = useState([]);
  console.log("blogs", blogs);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="container px-4 py-12 mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-5xl font-extrabold text-center text-white"
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
                  <BlogCard blog={blog} />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="text-center text-gray-400"
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

function BlogCard({ blog }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog?.likes?.length || 0);

  const clickHandler = (id) => {
    navigate(`/blog/${id}`);
  };

  const handleLike = async () => {
    try {
      const response = await axios.post("/api/blog/like", { blogId: blog._id });
      if (response.data.success) {
        setIsLiked((prevIsLiked) => {
          const newLikeState = !prevIsLiked;
          setLikeCount((prevLikeCount) =>
            newLikeState ? prevLikeCount + 1 : prevLikeCount - 1
          );
          return newLikeState;
        });
      }
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  return (
    <motion.div
      className="mb-8 overflow-hidden transition-all duration-300 bg-gray-800 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 rounded-xl hover:shadow-2xl"
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="relative">
        <img
          src={blog.coverImage || "/default-image.jpg"}
          alt={blog.title || "Untitled"}
          className="object-cover w-full h-64"
          onError={(e) => (e.target.src = "/default-image.jpg")}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h2
            onClick={() => clickHandler(blog?._id)}
            className="mb-2 text-2xl font-bold text-white transition-colors duration-300 cursor-pointer hover:text-yellow-400 line-clamp-2"
          >
            {blog.title || "Untitled"}
          </h2>
          <div className="flex items-center text-sm text-gray-300">
            <FaUser className="mr-2 text-pink-500" />
            <span>{blog.author || "Unknown Author"}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="mb-6 text-gray-300 line-clamp-3">
          {blog.content || "No content available."}
        </p>
        <div className="flex items-center justify-between pt-4 text-sm text-gray-400 border-t border-gray-700">
          <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={handleLike}
          >
            <FaHeart
              className={`mr-2 ${isLiked ? "text-pink-500" : "text-gray-400"}`}
            />
            <span>{likeCount}</span>
          </motion.div>
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.1, color: "#4299e1" }}
          >
            <FaComment className="mr-2 text-blue-400" />
            <span>{blog.comments?.length || 0}</span>
          </motion.div>
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.1, color: "#48bb78" }}
          >
            <FaClock className="mr-2 text-green-400" />
            <span>{format(new Date(blog.createdAt), "MMM d, yyyy")}</span>
          </motion.div>
        </div>
      </div>
      <motion.button
        className="w-full py-3 font-semibold text-center text-white transition-colors duration: 300 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500"
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
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-gray-900 to-black">
      <ImSpinner9 className="text-6xl text-pink-500 animate-spin" />
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="px-6 py-4 text-red-700 bg-red-100 border border-red-400 rounded-lg shadow-lg"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{message}</span>
      </motion.div>
    </div>
  );
}

export default AllBlog;
