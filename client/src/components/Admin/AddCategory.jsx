import React, { useState } from "react";
import axios from "axios";
import { Form, message } from "antd";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

function AddCategory() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post("/api/category/create", {
        name: values.name,
      });
      message.success("Category created successfully!");
      form.resetFields();
    } catch (error) {
      message.error("Error creating category. Please try again.");
      console.error("Error creating category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 mx-auto bg-white rounded-md"
    >
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Add Category</h2>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="name"
          label={<span className="text-gray-700">Category Name</span>}
          rules={[
            { required: true, message: "Please input the category name!" },
          ]}
        >
          <input
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter category name"
          />
        </Form.Item>
        <Form.Item>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:shadow-outline sm:w-max"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="w-5 h-5 mr-2 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <FaPlus className="mr-2" />
            )}
            {loading ? "Creating..." : "Create Category"}
          </motion.button>
        </Form.Item>
      </Form>
    </motion.div>
  );
}

export default AddCategory;
