import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaComment, FaClock, FaUser } from "react-icons/fa";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd"; // Ant Design ka message component

function BlogCard({ blog, user }) {
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(blog?.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(
    blog?.likes?.includes(user?.id) || false
  );

  const clickHandler = (id) => {
    navigate(`/blog/${id}`);
  };

  const handleLike = async () => {
    if (!user) {
      message.error("Please login to like the blog.");
      return;
    }

    try {
      const response = await axios.post("/api/blog/like", { blogId: blog._id });
      setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
      setIsLiked(!isLiked);
      console.log("response", response);
    } catch (error) {
      console.error("Error liking the blog:", error);
      message.error("Failed to like the blog.");
    }
  };

  return (
    <motion.div
      className="mb-8 overflow-hidden transition-all duration-300 shadow-gray-800 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 rounded-xl hover:shadow-2xl hover:shadow-gray-900"
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="relative">
        <img
          src={blog.coverImage || "https://via.placeholder.com/800x400"}
          alt={blog.title || "Untitled"}
          className="object-cover w-full h-64"
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/800x400")
          }
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h2
            onClick={() => clickHandler(blog?._id)}
            className="mb-2 text-2xl font-bold text-white transition-colors duration-300 cursor-pointer hover:text-yellow-400 line-clamp-2"
          >
            {blog.title || "Untitled"}
          </h2>
        </div>
      </div>
      <div className="p-6">
        <p className="mb-6 text-gray-50 line-clamp-3">
          {blog.content || "No content available."}
        </p>
        <div className="flex items-center justify-between pt-4 text-sm text-gray-400 border-t border-gray-700">
          <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={handleLike}
          >
            <FaHeart
              className={`mr-2 ${
                isLiked ? "text-red-500 text-2xl" : "text-white text-2xl"
              }`}
            />
            <span className="text-white">{likeCount}</span>
          </motion.div>

          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.1, color: "#48bb78" }}
          >
            <FaClock className="mr-2 text-green-400" />
            <span className="text-white">
              {format(new Date(blog.createdAt), "MMM d, yyyy")}
            </span>
          </motion.div>
        </div>
      </div>
      <motion.button
        className="w-full py-3 font-semibold text-center text-white transition-colors duration-300 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500"
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        onClick={() => clickHandler(blog?._id)}
      >
        Read More
      </motion.button>
    </motion.div>
  );
}

export default BlogCard;
