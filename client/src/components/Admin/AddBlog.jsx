import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, message } from "antd";

const { Option } = Select;

function AddBlog({ blogId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBlog = async () => {
      if (blogId) {
        try {
          setLoading(true);
          const { data } = await axios.get(`/api/blog/blogs/${blogId}`);
          setTitle(data.title);
          setContent(data.content);
          setCoverImage(data.coverImage);
          setSelectedCategory(data.category); // assuming the blog data includes category
        } catch (error) {
          message.error("Error fetching blog data.");
          console.error("Error fetching blog:", error);
        } finally {
          setLoading(false);
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

    // Validation checks
    if (!title.trim()) {
      message.error("Title is required.");
      return;
    }
    if (!content.trim()) {
      message.error("Content is required.");
      return;
    }
    if (!coverImage) {
      message.error("Cover Image is required.");
      return;
    }
    if (!selectedCategory) {
      message.error("Category is required.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("coverImage", coverImage);
    formData.append("category", selectedCategory);

    try {
      if (blogId) {
        await axios.put(`/api/blog/blogs/${blogId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Blog updated successfully!");
      } else {
        await axios.post("/api/blog/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Blog created successfully!");
      }
    } catch (error) {
      message.error("Error saving blog. Please try again.");
      console.error("Error saving blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/category/all`);
      setCategories(data);
    } catch (error) {
      message.error("Error fetching categories.");
      console.log("Error while getting categories:", error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="mb-4 text-2xl font-semibold">
        {blogId ? "Update Blog" : "Add Blog"}
      </h1>
      <form onSubmit={handleSubmit} disabled={loading}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-purple-300"
            placeholder="Enter blog title"
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-purple-300"
            rows="5"
            placeholder="Enter blog content"
            disabled={loading}
          ></textarea>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="w-full mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Cover Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-purple-300"
              disabled={loading}
            />
            {coverImage && (
              <img
                src={
                  typeof coverImage === "string"
                    ? coverImage
                    : URL.createObjectURL(coverImage)
                }
                alt="Cover"
                className="object-cover w-64 h-64 mt-4"
              />
            )}
          </div>
          <div className="w-full mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full h-11"
              placeholder="Select a category"
              disabled={loading}
            >
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <button
          type="submit"
          className={`px-4 py-2 text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : blogId ? "Update Blog" : "Add Blog"}
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
