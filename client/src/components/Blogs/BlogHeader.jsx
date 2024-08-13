import React from "react";
import { motion } from "framer-motion";

function BlogHeader({ coverImage, title }) {
  return (
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
          src={coverImage}
          alt={title}
          className="object-contain w-full h-[450px]"
        />
      </motion.div>
      <div className="p-8">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          {title}
        </h1>
      </div>
    </motion.div>
  );
}

export default BlogHeader;
