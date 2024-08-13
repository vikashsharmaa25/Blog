import axios from "axios";
import React, { useEffect, useState } from "react";
import { setAuthUser } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data } = await axios.post(`/api/user/register`, formData);
      if (data) {
        dispatch(setAuthUser(data?.user));
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[90.9vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-white">
            Create your account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="relative block w-full px-3 py-2 pl-10 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="relative block w-full px-3 py-2 pl-10 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="relative block w-full px-3 py-2 pl-10 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-500"
            >
              {error}
            </motion.div>
          )}

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSignInAlt className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
              {isLoading ? "Signing up..." : "Sign up"}
            </motion.button>
          </div>
        </form>
        <div className="text-sm text-center">
          <span className="text-white">Already have an account? </span>
          <Link
            to="/login"
            className="font-medium text-indigo-200 hover:text-indigo-100"
          >
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
