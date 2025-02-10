import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserCircle, LogOut, Settings } from "lucide-react";
import { AuthContext } from "../Authentication/AuthContext"; // Import AuthContext
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase"; // Import Firebase authentication

function Navbar() {
  const { user, role } = useContext(AuthContext); // Get user and role from context
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

  // Logout Function
  const handleLogout = async () => {
    await signOut(auth);
  };

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
        <li><Link to="/booking" className="hover:text-gray-300">Booking Table</Link></li>
        <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
        <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>

        {/* Show Restaurant link for restaurant owners */}
        {role === "restaurant_owner" && (
          <li><Link to="/restaurant" className="hover:text-gray-300">Restaurant</Link></li>
        )}

        {/* Show Admin link for admins */}
        {role === "admin" && (
          <li><Link to="/admin" className="hover:text-gray-300">Admin</Link></li>
        )}

        {/* Show Restaurant Details Page only for Customers */}
        {role === "customer" && (
          <li><Link to="/restaurant-details" className="hover:text-gray-300">Restaurant Details</Link></li>
        )}
      </ul>

      {/* Authentication Links */}
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
    </nav>
  );
}

export default Navbar;
