import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUsers,
  FiSettings,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import AddBlog from "./AddBlog";
import ManageUsers from "./ManageUsers";
import Settings from "./Settings";
import AllBlog from "./AllBlog";
import AddCategory from "./AddCategory";
import AllCategory from "./AllCategory";

function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("allBlog");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const [isBlogSubmenuOpen, setIsBlogSubmenuOpen] = useState(false);
  const [isCategorySubmenuOpen, setIsCategorySubmenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (menu, id = null) => {
    setActiveMenu(menu);
    setEditBlogId(id);
    if (!isLargeScreen) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSubmenu = (submenu) => {
    if (submenu === "blog") {
      setIsBlogSubmenuOpen(!isBlogSubmenuOpen);
    } else if (submenu === "category") {
      setIsCategorySubmenuOpen(!isCategorySubmenuOpen);
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "allBlog":
        return <AllBlog onEdit={handleMenuClick} />;
      case "addBlog":
        return <AddBlog blogId={editBlogId} />;
      case "allCategory":
        return <AllCategory />;
      case "addCategory":
        return <AddCategory />;
      case "manageUsers":
        return <ManageUsers />;
      case "settings":
        return <Settings />;
      default:
        return <AllBlog onEdit={handleMenuClick} />;
    }
  };

  const menuItems = [
    {
      name: "blog",
      icon: FiHome,
      label: "Blog",
      submenu: [
        { name: "allBlog", label: "All Blogs" },
        { name: "addBlog", label: "Add Blog" },
      ],
    },
    {
      name: "category",
      icon: BiCategory,
      label: "Category",
      submenu: [
        { name: "allCategory", label: "All Categories" },
        { name: "addCategory", label: "Add Category" },
      ],
    },
    { name: "manageUsers", icon: FiUsers, label: "Manage Users" },
    { name: "settings", icon: FiSettings, label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg bg-opacity-80 backdrop-filter backdrop-blur-lg lg:relative"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <h1 className="mb-8 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 lg:text-3xl">
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
                        className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-between ${
                          activeMenu === item.name
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() =>
                          item.submenu
                            ? toggleSubmenu(item.name)
                            : handleMenuClick(item.name)
                        }
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-3" />
                          {item.label}
                        </div>
                        {item.submenu && (
                          <span>
                            {item.name === "blog" && isBlogSubmenuOpen ? (
                              <FiChevronDown />
                            ) : item.name === "blog" ? (
                              <FiChevronRight />
                            ) : item.name === "category" &&
                              isCategorySubmenuOpen ? (
                              <FiChevronDown />
                            ) : (
                              <FiChevronRight />
                            )}
                          </span>
                        )}
                      </button>
                      {item.submenu && (
                        <AnimatePresence>
                          {(item.name === "blog" && isBlogSubmenuOpen) ||
                          (item.name === "category" &&
                            isCategorySubmenuOpen) ? (
                            <motion.ul
                              className="pl-6 mt-2 space-y-2"
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {item.submenu.map((subitem) => (
                                <li key={subitem.name}>
                                  <button
                                    className={`w-full text-left py-2 px-4 rounded-lg transition-all duration-200 flex items-center ${
                                      activeMenu === subitem.name
                                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                        : "hover:bg-gray-100"
                                    }`}
                                    onClick={() =>
                                      handleMenuClick(subitem.name)
                                    }
                                  >
                                    {subitem.label}
                                  </button>
                                </li>
                              ))}
                            </motion.ul>
                          ) : null}
                        </AnimatePresence>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-2xl text-gray-600 lg:hidden"
            >
              <FiX />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 ${
          isLargeScreen && isSidebarOpen ? "lg:ml-64" : ""
        } transition-all duration-300`}
      >
        {/* Header */}
        <motion.div
          className="sticky top-0 z-40 flex items-center justify-between p-4 bg-white shadow-md bg-opacity-80 backdrop-filter backdrop-blur-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={toggleSidebar}
            className="text-2xl text-gray-600 transition-colors duration-200 hover:text-gray-800"
          >
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 lg:text-2xl">
            Admin Dashboard
          </h1>
          <div className="w-8"></div>
        </motion.div>

        {/* Dashboard Content */}
        <motion.div
          className="flex-1 p-4 overflow-auto lg:p-6"
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
