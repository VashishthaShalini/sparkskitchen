import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      navigate("/home"); // redirect after login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4">

        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-10">

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Login to continue ordering delicious food
          </p>

          <form className="space-y-5" onSubmit={handleLogin}>

            <div>
              <label className="block text-gray-600 mb-1 text-sm">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 text-sm">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Login
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-red-600 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Login;