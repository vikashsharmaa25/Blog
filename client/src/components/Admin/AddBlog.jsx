import React, { useState, useEffect } from "react";
import axios from "axios";

function AddBlog({ blogId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      if (blogId) {
        try {
          const { data } = await axios.get(`/api/blog/blogs/${blogId}`);
          setTitle(data.title);
          setContent(data.content);
          setCoverImage(data.coverImage);
        } catch (error) {
          console.error("Error fetching blog:", error);
        }
      }
    };

    getBlog();
  }, [blogId]);

  const handleImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      if (blogId) {
        await axios.put(`/api/blog/blogs/${blogId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog updated successfully!");
      } else {
        await axios.post("/api/blog/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog created successfully!");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">
        {blogId ? "Update Blog" : "Add Blog"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-purple-300"
            placeholder="Enter blog title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-purple-300"
            rows="5"
            placeholder="Enter blog content"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Cover Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-purple-300"
          />
          {coverImage && (
            <img
              src={
                typeof coverImage === "string"
                  ? coverImage
                  : URL.createObjectURL(coverImage)
              }
              alt="Cover"
              className="mt-4 w-64 h-64 object-cover"
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700"
        >
          {blogId ? "Update Blog" : "Add Blog"}
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
