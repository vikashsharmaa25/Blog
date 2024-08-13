import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { ImSpinner9 } from "react-icons/im";
import { message } from "antd";

function AllCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/category/all`);
      setCategories(data);
    } catch (error) {
      console.log("Error while getting categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`/api/category/update/${editingCategory._id}`, {
        name: newCategoryName,
      });
      message.success("Category updated successfully");
      setEditingCategory(null);
      getAllCategory();
    } catch (error) {
      console.log("Error while updating category:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/category/delete/${id}`);
      message.success("category deleted successfully");
      getAllCategory();
    } catch (error) {
      console.log("Error while deleting category:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-[92vh]">
        <ImSpinner9 className="text-4xl animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">All Categories</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
          <thead>
            <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200">
              <th className="px-6 py-3 text-left">Category Name</th>
              <th className="px-6 py-3 text-left">Created At</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light text-gray-600">
            {categories.map((category) => (
              <tr
                key={category._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="px-6 py-3 text-left">{category.name}</td>
                <td className="px-6 py-3 text-left">
                  {new Date(category.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-3 text-center">
                  <div className="flex justify-center item-center">
                    <button
                      onClick={() => handleEditClick(category)}
                      className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="w-4 ml-2 transform hover:text-red-500 hover:scale-110"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit form modal */}
      {editingCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Edit Category</h2>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg"
            />
            <div className="flex justify-end">
              <button
                onClick={handleEditSave}
                className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setEditingCategory(null)}
                className="px-4 py-2 font-bold text-white bg-gray-500 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllCategory;
