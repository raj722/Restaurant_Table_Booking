import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircle, LogOut, Settings } from "lucide-react";
import { AuthContext } from "../Authentication/AuthContext"; // Import AuthContext

function Navbar() {
  const { user, role, logout } = useContext(AuthContext); // Get user, role, and logout function from context
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout Function using context (instead of Firebase)
  const handleLogout = () => {
    logout(); // Use the custom logout function from AuthContext
    navigate("/"); // Redirect to home or login page after logout
  };

  // Render Navbar only for general users, hide for Admin or Restaurant
  const renderNavbarLinks = () => {
    return (
      <>
        {/* Navigation Links */}
        <ul className="flex justify-center flex-grow space-x-6 text-center">
          {/* Home Link */}
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>

          {/* Role-based Links */}
          {role === "RestaurantUser" && (
            <li><Link to="/restaurant" className="hover:text-gray-300">Restaurant</Link></li>
          )}
          {role === "admin" && (
            <li><Link to="/admin" className="hover:text-gray-300">Admin Dashboard</Link></li>
          )}
          {role === "customer" && (
            <li>
              <Link to={`/restaurant/1`} className="hover:text-gray-300">Restaurant Details</Link>
            </li>
          )}
        </ul>
      </>
    );
  };

  // Render authentication links
  const renderAuthLinks = () => {
    return (
      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/signup" className="hover:text-gray-300">Signup</Link>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
              <UserCircle className="w-8 h-8 hover:text-gray-300" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 w-48 mt-2 bg-white rounded-lg shadow-lg">
                <Link to="/profile" className="flex items-center p-3 text-gray-800 hover:bg-gray-100">
                  <UserCircle className="w-5 h-5 mr-2" /> Profile
                </Link>
                <button className="flex items-center w-full p-3 text-left text-gray-800 hover:bg-gray-100">
                  <Settings className="w-5 h-5 mr-2" /> Settings
                </button>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center w-full p-3 text-left text-red-600 hover:bg-gray-100">
                  <LogOut className="w-5 h-5 mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Show Navbar for general users, hide for Admin and Restaurant */}
      {role !== "admin" && role !== "RestaurantUser" && (
        <nav className="flex items-center justify-between p-4 text-white bg-gray-800">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="/images/logo.png" 
                alt="Logo" 
                className="object-contain w-12 h-12 mr-4" 
              />
            </Link>
          </div>

          {renderNavbarLinks()}
          {renderAuthLinks()}
        </nav>
      */}

      {/* Show Admin Dashboard without Navbar */}
      {role === "admin" && (
        <div className="admin-dashboard">
          {/* Admin Dashboard Content Here */}
        </div>
      )}

      {/* Show Restaurant Page without Navbar */}
      {role === "RestaurantUser" && (
        <div className="restaurant-dashboard">
          {/* Restaurant Dashboard Content Here */}
        </div>
      )}
    </>
  );
};

export default Navbar;
