import React from "react";
import { motion } from "framer-motion";

function BlogContent({ content }) {
  return (
    <div className="p-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8 prose prose-lg text-white"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export default BlogContent;
