import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      navigate("/home");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4">

        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-10">

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Create Account 🍕
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Join FoodApp & start ordering your favorites
          </p>

          <form className="space-y-5" onSubmit={handleRegister}>

            <div>
              <label className="block text-gray-600 mb-1 text-sm">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                placeholder="Create password"
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
              Register
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-600 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Register;