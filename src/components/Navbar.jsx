import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex items-center justify-around">
      {/* Left side: Logo */}
      <div className="flex items-center">
        <img src="/path-to-logo.png" alt="Logo" className="h-10 w-10 mr-4" />
      </div>

      {/* Center: Navigation Links */}
      <ul className="flex space-x-6 text-center">
        <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
        <li><Link to="/booking" className="hover:text-gray-300">Booking Table</Link></li>
        <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
        <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
        <li><Link to="/gallery" className="hover:text-gray-300">Gallery</Link></li>
      </ul>

      {/* Right side: Login and Signup */}
      <div className="flex space-x-4">
        <Link to="/login" className="hover:text-gray-300">Login</Link>
        <Link to="/signup" className="hover:text-gray-300">Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;
    