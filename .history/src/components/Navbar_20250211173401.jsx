import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserCircle, LogOut, Settings } from "lucide-react";
import { AuthContext } from "../Authentication/AuthContext"; // Import AuthContext

function Navbar() {
  const { user, role, logout } = useContext(AuthContext); // Get user, role, and logout function from context
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  // Logout Function using context
  const handleLogout = () => {
    logout(); // Use the custom logout function from AuthContext
  };

  // If the user is an admin, don't render the Navbar
  if (role === "admin") {
    return null;
  }

  return (
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

      {/* Navigation Links */}
      <ul className="flex justify-center flex-grow space-x-6 text-center">
        {/* Home Link (Visible to all roles) */}
        <li><Link to="/" className="hover:text-gray-300">Home</Link></li>

        {/* About Us Link (Visible to all roles) */}
        <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>

        {/* Contact Link (Visible to all roles) */}
        <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>

        {/* Booking Table Link (Visible only to customers) */}
        {role === "customer" && (
          <li><Link to="/booking" className="hover:text-gray-300">Booking Table</Link></li>
        )}

        {/* Restaurant Page Link (Visible only to customers) */}
        {role === "customer" && (
          <li><Link to="/restaurant" className="hover:text-gray-300">Restaurant Page</Link></li>
        )}

        {/* Admin Dashboard Link (Visible only to customers) */}
        {role === "customer" && (
          <li><Link to="/admin" className="hover:text-gray-300">Admin Dashboard</Link></li>
        )}
      </ul>

      {/* Authentication Links */}
      <div className="flex items-center space-x-4">
        {!user ? (
          // Show Login and Signup if user is not logged in
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/signup" className="hover:text-gray-300">Signup</Link>
          </>
        ) : (
          // Show Profile dropdown if user is logged in
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
    </nav>
  );
}

export default Navbar;