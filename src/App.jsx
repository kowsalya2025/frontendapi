import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProjectList from "./components/ProjectList";

// ProtectedRoute component
function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("access_token"); // check if token exists
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected home page */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProjectList />
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;



