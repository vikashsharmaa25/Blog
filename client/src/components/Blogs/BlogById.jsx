import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaComment, FaClock, FaUser, FaShare } from "react-icons/fa";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center text-gray-600 text-sm mb-4">
            <FaUser className="mr-2" /> {blog.author}
            <FaClock className="ml-4 mr-2" />{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </div>
          <div className="flex justify-center space-x-4 text-gray-600">
            <FaHeart className="hover:text-red-500 cursor-pointer" />
            <FaComment
              className="hover:text-blue-500 cursor-pointer"
              onClick={() => setShowComments(!showComments)}
            />
            <FaShare className="hover:text-green-500 cursor-pointer" />
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative h-80 md:h-96"
        >
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
            <p className="text-sm text-gray-300 text-center">
              Pexel - {blog.imageCredit || "Unknown"}
            </p>
          </div>
        </motion.div>
        <div className="p-6 lg:p-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="prose prose-lg text-gray-800 mb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <AnimatePresence>
            {showComments && <CommentSection comments={blog.comments} />}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-200">
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
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md"
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
      className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.map((comment, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4 p-4 bg-gray-100 rounded-lg"
          >
            <p className="font-semibold text-gray-700">{comment.author}</p>
            <p className="text-gray-600">{comment.content}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default BlogById;
