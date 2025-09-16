import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProjectList from "./components/ProjectList";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected route for ProjectList */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProjectList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;




