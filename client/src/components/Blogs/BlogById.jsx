import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaComment, FaClock, FaUser, FaShare } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

function BlogById() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);

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
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="object-contain w-full h-[450px]"
          />
        </motion.div>
      </motion.div>
      <div className="max-w-[1100px] mx-auto">
        <div className="p-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            {blog.title}
          </h1>
        </div>
        <div className="p-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 prose prose-lg text-white"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex space-x-4 text-white">
              <button className="flex items-center space-x-2 transition-colors hover:text-red-500">
                <FaHeart /> <span>Like</span>
              </button>
              <button
                className="flex items-center space-x-2 transition-colors hover:text-blue-500"
                onClick={() => setShowComments(!showComments)}
              >
                <FaComment /> <span>Comment</span>
              </button>
              <button className="flex items-center space-x-2 transition-colors hover:text-green-500">
                <FaShare /> <span>Share</span>
              </button>
            </div>
          </div>
          <AnimatePresence>
            {showComments && <CommentSection comments={blog.comments} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="w-full flex justify-center items-center h-[92vh]">
      <ImSpinner9 className="text-4xl animate-spin" />
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 text-red-700 bg-red-100 border-l-4 border-red-500 rounded-lg shadow-md"
        role="alert"
      >
        <p className="font-bold">Error</p>
        <p>{message}</p>
      </motion.div>
    </div>
  );
}

function CommentSection({ comments }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-8"
    >
      <h2 className="mb-4 text-2xl font-bold">Comments</h2>
      {comments.map((comment, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 mb-4 rounded-lg bg-gray-50"
        >
          <p className="font-semibold text-gray-700">{comment.author}</p>
          <p className="text-gray-600">{comment.content}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default BlogById;
