import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-bold text-gray-900"
        >
          ShopEase
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Cart
          </Link>

          <Link
            to="/orders"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Orders
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-blue-600 hover:text-blue-800 font-semibold transition"
                >
                  Admin
                </Link>
              )}

              <span className="text-gray-700 font-medium">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Login
            </Link>
          )}

        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-gray-900"
        >
          ☰
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 font-medium"
          >
            Home
          </Link>

          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 font-medium"
          >
            Products
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 font-medium"
          >
            Cart
          </Link>

          <Link
            to="/orders"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 font-medium"
          >
            Orders
          </Link>

          {user && user.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="block text-blue-600 font-semibold"
            >
              Admin
            </Link>
          )}

          {!user && (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-900 font-semibold"
            >
              Login
            </Link>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="text-red-600 font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;