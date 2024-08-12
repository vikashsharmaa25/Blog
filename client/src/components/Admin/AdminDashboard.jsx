import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import AddBlog from "./AddBlog";
import ManageUsers from "./ManageUsers";
import Settings from "./Settings";
import AllBlog from "./AllBlog";

function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editBlogId, setEditBlogId] = useState(null); // New state for edit ID

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (menu, id = null) => {
    setActiveMenu(menu);
    setEditBlogId(id); // Set the edit ID when navigating
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "allBlog":
        return <AllBlog onEdit={handleMenuClick} />; // Pass the handleMenuClick function to AllBlog
      case "addBlog":
        return <AddBlog blogId={editBlogId} />; // Pass the editBlogId as a prop to AddBlog
      case "manageUsers":
        return <ManageUsers />;
      case "settings":
        return <Settings />;
      default:
        return <AllBlog onEdit={handleMenuClick} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        className={`bg-white w-64 shadow-lg ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h1>
          <nav>
            <ul className="space-y-2">
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded hover:bg-purple-100 flex items-center ${
                    activeMenu === "allBlog" ? "bg-purple-100" : ""
                  }`}
                  onClick={() => handleMenuClick("allBlog")}
                >
                  All Blog
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded hover:bg-purple-100 flex items-center ${
                    activeMenu === "addBlog" ? "bg-purple-100" : ""
                  }`}
                  onClick={() => handleMenuClick("addBlog")}
                >
                  Add Blog
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded hover:bg-purple-100 flex items-center ${
                    activeMenu === "manageUsers" ? "bg-purple-100" : ""
                  }`}
                  onClick={() => handleMenuClick("manageUsers")}
                >
                  Manage Users
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded hover:bg-purple-100 flex items-center ${
                    activeMenu === "settings" ? "bg-purple-100" : ""
                  }`}
                  onClick={() => handleMenuClick("settings")}
                >
                  Settings
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <motion.div
          className="bg-white p-4 shadow-lg flex justify-between items-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button onClick={toggleSidebar} className="text-2xl">
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700">
            Logout
          </button>
        </motion.div>

        {/* Dashboard Content */}
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;
