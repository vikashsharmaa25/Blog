import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function CommentSection({ blogId, comments }) {
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState(comments || []);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post("/api/blog/comment", {
        blogId,
        comment: newComment,
      });

      // Assuming response.data.comment contains the entire comment object including user details
      setCommentList([...commentList, response.data.comment]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-8"
    >
      <h2 className="mb-4 text-2xl font-bold">Comments</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleCommentSubmit}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Comment
        </button>
      </div>
      {commentList.map((comment, index) => (
        <motion.div
          key={comment._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 mb-4 rounded-lg bg-gray-50 flex items-start"
        >
          <img
            src={comment.user.profilePicture || "default-profile-pic-url"} // Add a fallback profile picture URL if needed
            alt={comment.user.username}
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <p className="font-semibold text-gray-700">
              {comment.user.username}
            </p>
            <p className="text-gray-600">{comment.comment}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default CommentSection;
