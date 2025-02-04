import React from "react";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

function Navbar() {
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
        <li><Link to="/gallery" className="hover:text-gray-300">Gallery</Link></li>
        <li><Link to="/restaurant" className="hover:text-gray-300">Restaurant</Link></li>
      </ul>

      {/* Login, Signup, and Profile */}
      <div className="flex items-center space-x-4">
        <Link to="/login" className="hover:text-gray-300">Login</Link>
        <Link to="/signup" className="hover:text-gray-300">Signup</Link>

        {/* Profile Icon */}
        <Link to="/profile">
          <UserCircle className="w-8 h-8 hover:text-gray-300" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
