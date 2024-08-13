import React from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

function InteractionButtons({ onCommentClick }) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
      <div className="flex space-x-4 text-white">
        <button className="flex items-center space-x-2 transition-colors hover:text-red-500">
          <FaHeart /> <span>Like</span>
        </button>
        <button
          className="flex items-center space-x-2 transition-colors hover:text-blue-500"
          onClick={onCommentClick}
        >
          <FaComment /> <span>Comment</span>
        </button>
        <button className="flex items-center space-x-2 transition-colors hover:text-green-500">
          <FaShare /> <span>Share</span>
        </button>
      </div>
    </div>
  );
}

export default InteractionButtons;
