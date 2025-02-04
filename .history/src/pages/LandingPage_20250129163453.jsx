import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to Our Restaurant</h1>
      <p className="mt-4 text-lg text-gray-700">Discover the best dining experience with us.</p>
      
      <Link
        to="/restaurant"
        className="px-6 py-3 mt-6 text-white transition bg-red-600 rounded-lg hover:bg-red-700"
      >
        Get Started
      </Link>

      {/* About Restaurant Label */}
      <p className="mt-4 text-lg font-semibold text-gray-600">About Restaurant</p>
    </div>
  );
};

export default LandingPage;
