import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // If the user is not authenticated, redirect to login
  return user ? children : <Navigate to="/login" replace />;
};

export const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // If the user is not an admin, redirect to the dashboard
  return user && user.role === "admin" ? (
    children
  ) : (
    <Navigate to="/dashboard" replace />
  );
};
