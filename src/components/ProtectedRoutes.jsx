// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isInitialized, isLoggedIn } = useAuth();

  // while auth state initializing, you may show loader
  if (!isInitialized) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
