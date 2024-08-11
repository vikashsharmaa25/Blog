import React from "react";
import { motion } from "framer-motion";

const Sidebar = ({ activeTab, setActiveTab, menuItems }) => {
  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-indigo-700 text-white p-6"
    >
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
      <ul>
        {menuItems.map((item) => (
          <motion.li
            key={item.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center p-3 mb-4 rounded-lg cursor-pointer ${
              activeTab === item.id ? "bg-indigo-800" : "hover:bg-indigo-600"
            }`}
          >
            <item.icon className="mr-3" />
            {item.label}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
