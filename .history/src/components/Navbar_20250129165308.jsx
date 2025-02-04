import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-4 bg-blue-500">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-2xl font-bold text-white">
          TableBooking
        </Link>
        <div className="space-x-6">
          <Link to="/booking" className="text-white hover:text-gray-300">
            Book a Table
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-300">
            Contact
          </Link>
          <Link to="/gallery" className="text-white hover:text-gray-300">
            Gallery
          </Link>
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
          <Link to="/signup" className="text-white hover:text-gray-300">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
