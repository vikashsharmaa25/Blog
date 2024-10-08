import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Resgiter from "./components/Register/Resgiter";
import Navbar from "./components/Navbar/Navbar";
import { AdminRoute, PrivateRoute } from "./components/routes/PrivateRoute";
import Dashboard from "./components/User/Dashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import BlogById from "./components/Blogs/BlogById";
import About from "./components/About/About";

function App() {
  return (
    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Resgiter />} />
        <Route path="/blog/:id" element={<BlogById />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* ==== Admin route ===== */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
