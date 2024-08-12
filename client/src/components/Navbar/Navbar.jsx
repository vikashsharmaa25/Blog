import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaHome,
  FaInfoCircle,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/slices/authSlice";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleNavbar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await axios.get("/api/user/logout");
    dispatch(setAuthUser(null));
    navigate("/login", { replace: true });
  };

  const navItems = [
    { to: "/", label: "Home", icon: FaHome },
    { to: "/about", label: "About", icon: FaInfoCircle },
    ...(user
      ? user.role === "admin"
        ? [{ to: "/admin", label: "Admin", icon: FaUser }]
        : [{ to: "/dashboard", label: "Dashboard", icon: FaUser }]
      : [
          { to: "/login", label: "Login", icon: FaSignInAlt },
          { to: "/register", label: "Register", icon: FaUserPlus },
        ]),
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="text-white font-bold text-2xl">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Logo
            </motion.span>
          </NavLink>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-white hover:text-purple-200 transition-colors duration-200 flex items-center ${
                    isActive ? "font-semibold" : ""
                  }`
                }
              >
                <item.icon className="mr-2" />
                {item.label}
              </NavLink>
            ))}
            {user && (
              <>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-purple-200 transition-colors duration-200"
                >
                  Logout
                </button>
                <span className="text-white flex items-center bg-purple-700 px-3 py-1 rounded-full">
                  <FaUser className="mr-2" /> {user.username}
                </span>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleNavbar}
              className="text-white focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4"
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `text-white hover:text-purple-200 transition-colors duration-200 flex items-center ${
                      isActive ? "font-semibold" : ""
                    }`
                  }
                  onClick={toggleNavbar}
                >
                  <item.icon className="mr-2" />
                  {item.label}
                </NavLink>
              ))}
              {user && (
                <>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleNavbar();
                    }}
                    className="text-white hover:text-purple-200 transition-colors duration-200"
                  >
                    Logout
                  </button>
                  <span className="text-white flex items-center bg-purple-700 px-3 py-1 rounded-full">
                    <FaUser className="mr-2" /> {user.username}
                  </span>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
