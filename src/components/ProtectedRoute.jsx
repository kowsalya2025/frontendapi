import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token"); // Check if user is logged in

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if not
  }

  return children; // Render children if logged in
}

export default ProtectedRoute;

