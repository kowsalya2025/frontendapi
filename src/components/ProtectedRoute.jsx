import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    // User is not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // Show the protected page
}

export default ProtectedRoute;
