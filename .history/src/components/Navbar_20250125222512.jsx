import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 text-white bg-gray-800">
      {/* Left side: Logo (Link to Landing Page) */}
      <div className="flex items-center">
        <Link to="/">
          <img 
            src="/images/logo.png" 
            alt="Logo" 
            className="object-contain w-12 h-12 mr-4" 
          />
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <ul className="flex justify-center flex-grow space-x-6 text-center">
        <li><Link to="/home" className="hover:text-gray-300">Home</Link></li>
        <li><Link to="/booking" className="hover:text-gray-300">Booking Table</Link></li>
        <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
        <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
        <li><Link to="/gallery" className="hover:text-gray-300">Gallery</Link></li>
        <li><Link to="/admin" className="hover:text-gray-300">Admin</Link></li>
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
