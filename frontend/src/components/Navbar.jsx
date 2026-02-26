import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  let username = "";

  // ✅ Decode username from JWT
  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.name || decoded.sub || "User";
    } catch (err) {
      console.log("Invalid token");
    }
  }

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide cursor-pointer">
          🍔 Spark's Kitchen
        </h1>

        {/* Nav Links */}
        <div className="flex gap-8 items-center font-medium relative">

          {/* Not Logged In Home */}
          {!token && (
            <Link
              to="/landing"
              className="hover:text-yellow-300 transition"
            >
              Home
            </Link>
          )}

          {/* Logged In Home */}
          {token && (
            <Link
              to="/home"
              className="hover:text-yellow-300 transition"
            >
              Home
            </Link>
          )}

          <Link
            to="/category"
            className="hover:text-yellow-300 transition"
          >
            Category
          </Link>

          {/* Logged-in Only Links */}
          {token && (
            <>
              <Link
                to="/orders"
                className="hover:text-yellow-300 transition"
              >
                Orders
              </Link>

              <Link
                to="/cart"
                className="hover:text-yellow-300 transition"
              >
                Cart
              </Link>
            </>
          )}

          <Link
            to="/about"
            className="hover:text-yellow-300 transition"
          >
            About Us
          </Link>

          {/* Login / Profile */}
          {!token ? (
            <Link
              to="/login"
              className="bg-white text-red-600 px-4 py-1 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              
              {/* User Icon */}
              <button
                onClick={() => setOpen(!open)}
                className="bg-white text-red-600 w-10 h-10 rounded-full font-bold flex items-center justify-center hover:bg-gray-200 transition"
              >
                {username.charAt(0).toUpperCase()}
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-lg shadow-lg py-2">
                  <p className="px-4 py-2 text-sm font-semibold border-b">
                    {username}
                  </p>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;