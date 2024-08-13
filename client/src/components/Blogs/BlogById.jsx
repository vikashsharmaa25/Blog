import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import BlogHeader from "./BlogHeader";
import BlogContent from "./BlogContent";
import InteractionButtons from "./InteractionButtons";
import CommentSection from "./CommentSection";

function BlogById() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);

  console.log("blog", blog);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blog/blogs/${id}`);
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
      <BlogHeader coverImage={blog.coverImage} title={blog.title} />
      <div className="max-w-[1100px] mx-auto">
        <BlogContent content={blog.content} />
        <InteractionButtons
          onCommentClick={() => setShowComments(!showComments)}
        />
        <AnimatePresence>
          {showComments && (
            <CommentSection blogId={blog._id} comments={blog.comments} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default BlogById;
