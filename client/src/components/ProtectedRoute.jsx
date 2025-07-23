// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// You can replace this with context or a utility
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // or check a context or cookie
};

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
