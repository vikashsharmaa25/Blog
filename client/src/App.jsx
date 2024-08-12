import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Resgiter from "./components/Register/Resgiter";
import Navbar from "./components/Navbar/Navbar";
import AddBlog from "./components/Admin/AddBlog";
import UpdateBlog from "./components/Admin/UpdateBlog";
import { AdminRoute, PrivateRoute } from "./components/routes/PrivateRoute";
import Dashboard from "./components/User/Dashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import BlogById from "./components/Blogs/BlogById";

function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
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
