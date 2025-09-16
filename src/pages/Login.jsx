import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("https://backserver-3.onrender.com/api/token/", {
        username,
        password,
      });

      // ✅ Store tokens securely
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      // ✅ Redirect to home
      window.location.href = "/";
    } catch (err) {
      // ✅ Show proper error message from backend if available
      setError(err.response?.data?.detail || "Invalid username or password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
          Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-3">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring focus:ring-green-300"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring focus:ring-green-300"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* ✅ Added "Register" link here */}
        <p className="text-sm mt-3 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-green-600 hover:underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;


