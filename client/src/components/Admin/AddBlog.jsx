import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import privateAxiosInstance from "../../axiosInstance/privateAxiosInstance";

Modal.setAppElement("#root");

const AddBlog = ({ isModalOpen, setIsModalOpen, blogData, setBlogData }) => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("content", blogData.content);
    if (file) {
      formData.append("coverImage", file);
    }

    try {
      const response = await privateAxiosInstance.post(
        "http://localhost:4000/api/blog/create",
        formData
      );
      console.log("Blog created successfully:", response.data);
      setIsModalOpen(false);
      setBlogData({ title: "", content: "", coverImage: "" });
      setFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      className="modal"
      overlayClassName="overlay"
    >
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-white p-5 rounded-lg w-full max-w-[600px] min-w-[600px] h-[600px] overflow-y-auto mx-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add New Blog</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={blogData.title}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={blogData.content}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="coverImage"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Cover Image
                </label>
                <input
                  type="file"
                  id="coverImage"
                  name="coverImage"
                  onChange={handleFileChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-gray-700 text-sm mb-2">Image Preview:</p>
                    <img
                      src={imagePreview}
                      alt="Selected cover"
                      className="rounded-lg shadow-md max-w-[200] max-h-[200] mx-auto"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Blog
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default AddBlog;
