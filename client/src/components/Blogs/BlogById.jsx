import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaHeart, FaComment, FaClock, FaUser } from "react-icons/fa";

function BlogById() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/blog/blogs/${id}`
        );
        setBlog(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blog. Please try again later.");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!blog) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <motion.img
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-96 object-cover object-center"
        />
        <div className="p-8">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {blog.title}
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center space-x-4 text-sm text-gray-500 mb-6"
          >
            <span className="flex items-center">
              <FaClock className="mr-2" />{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <FaHeart className="mr-2" /> {blog.likes} likes
            </span>
            <span className="flex items-center">
              <FaComment className="mr-2" /> {blog.comments.length} comments
            </span>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="prose prose-lg text-gray-700 mb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300"
            >
              Like Post
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300"
            >
              Add Comment
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <motion.div
        animate={{
          rotate: 360,
          borderRadius: ["50% 50%", "20% 80%", "80% 20%", "50% 50%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
        className="w-16 h-16 border-4 border-indigo-500 border-t-transparent"
      />
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md"
        role="alert"
      >
        <p className="font-bold">Error</p>
        <p>{message}</p>
      </motion.div>
    </div>
  );
}

export default BlogById;
