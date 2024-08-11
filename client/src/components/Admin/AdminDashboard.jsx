import React, { useState } from "react";
import { FaPlus, FaEdit, FaList, FaUser, FaChartBar } from "react-icons/fa";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import BlogsContent from "./BlogsContent";
import UsersContent from "./UsersContent";
import AddBlog from "./AddBlog";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    coverImage: "",
  });

  const menuItems = [
    { id: "dashboard", icon: FaChartBar, label: "Dashboard" },
    { id: "blogs", icon: FaList, label: "Manage Blogs" },
    { id: "users", icon: FaUser, label: "Manage Users" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Blog Data:", blogData);
    // Here you would typically send this data to your API
    setIsModalOpen(false);
    setBlogData({ title: "", content: "", coverImage: "" });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        menuItems={menuItems}
      />
      <div className="flex-1 p-10 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">
          {activeTab === "dashboard" && "Dashboard"}
          {activeTab === "blogs" && "Manage Blogs"}
          {activeTab === "users" && "Manage Users"}
        </h2>
        {activeTab === "dashboard" && <DashboardContent />}
        {activeTab === "blogs" && (
          <>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
              <FaPlus className="inline-block mr-2" />
              Add New Blog
            </button>
            <BlogsContent />
          </>
        )}
        {activeTab === "users" && <UsersContent />}
      </div>
      <AddBlog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        blogData={blogData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AdminDashboard;
