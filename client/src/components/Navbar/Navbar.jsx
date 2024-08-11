import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/slices/authSlice";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await axios.get("/api/user/logout");

    dispatch(setAuthUser(null));
    navigate("/login", { replace: true });
  };

  const navLinkStyles = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: isActive ? "underline" : "none",
  });

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white font-bold text-xl">
          Logo
        </NavLink>
        <div className="hidden md:flex space-x-4">
          <NavLink
            to="/"
            style={navLinkStyles}
            className="text-white hover:text-gray-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            style={navLinkStyles}
            className="text-white hover:text-gray-300"
          >
            About
          </NavLink>
          {user ? (
            <>
              <NavLink
                to="/dashboard"
                style={navLinkStyles}
                className="text-white hover:text-gray-300"
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300"
              >
                Logout
              </button>
              <span className="text-white flex items-center">
                <FaUser className="mr-2" /> {user.username}
              </span>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                style={navLinkStyles}
                className="text-white hover:text-gray-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                style={navLinkStyles}
                className="text-white hover:text-gray-300"
              >
                Register
              </NavLink>
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
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-center space-y-4 py-4">
            <NavLink
              to="/"
              style={navLinkStyles}
              className="text-white hover:text-gray-300"
              onClick={toggleNavbar} // Close menu on navigation
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              style={navLinkStyles}
              className="text-white hover:text-gray-300"
              onClick={toggleNavbar} // Close menu on navigation
            >
              About
            </NavLink>
            {user ? (
              <>
                <NavLink
                  to="/dashboard"
                  style={navLinkStyles}
                  className="text-white hover:text-gray-300"
                  onClick={toggleNavbar}
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleNavbar();
                  }}
                  className="text-white hover:text-gray-300"
                >
                  Logout
                </button>
                <span className="text-white flex items-center">
                  <FaUser className="mr-2" /> {user.username}
                </span>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  style={navLinkStyles}
                  className="text-white hover:text-gray-300"
                  onClick={toggleNavbar} // Close menu on navigation
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  style={navLinkStyles}
                  className="text-white hover:text-gray-300"
                  onClick={toggleNavbar} // Close menu on navigation
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
