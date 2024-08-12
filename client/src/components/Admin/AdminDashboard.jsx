import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiHome,
  FiPlus,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import AddBlog from "./AddBlog";
import ManageUsers from "./ManageUsers";
import Settings from "./Settings";
import AllBlog from "./AllBlog";

function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("allBlog");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editBlogId, setEditBlogId] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (menu, id = null) => {
    setActiveMenu(menu);
    setEditBlogId(id);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "allBlog":
        return <AllBlog onEdit={handleMenuClick} />;
      case "addBlog":
        return <AddBlog blogId={editBlogId} />;
      case "manageUsers":
        return <ManageUsers />;
      case "settings":
        return <Settings />;
      default:
        return <AllBlog onEdit={handleMenuClick} />;
    }
  };

  const menuItems = [
    { name: "allBlog", icon: FiHome, label: "All Blogs" },
    { name: "addBlog", icon: FiPlus, label: "Add Blog" },
    { name: "manageUsers", icon: FiUsers, label: "Manage Users" },
    { name: "settings", icon: FiSettings, label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg w-64 shadow-lg"
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8">
                Admin Panel
              </h1>
              <nav>
                <ul className="space-y-3">
                  {menuItems.map((item) => (
                    <motion.li
                      key={item.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 flex items-center ${
                          activeMenu === item.name
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleMenuClick(item.name)}
                      >
                        <item.icon className="mr-3" />
                        {item.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg p-4 shadow-md flex justify-between items-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={toggleSidebar}
            className="text-2xl text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Admin Dashboard
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center"
          >
            <FiLogOut className="mr-2" />
            Logout
          </motion.button>
        </motion.div>

        {/* Dashboard Content */}
        <motion.div
          className="flex-1 p-6 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}

export default AdminDashboard;
