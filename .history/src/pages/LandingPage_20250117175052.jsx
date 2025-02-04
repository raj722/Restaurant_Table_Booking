import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background image grid */}
      <div className="absolute inset-0 grid grid-cols-3 gap-0">
        <div className="bg-[url('/images/party_1.jpg')] bg-cover bg-center" />
        <div className="bg-[url('/images/party_2.png')] bg-cover bg-center" />
        <div className="bg-[url('/images/party_3.jpg')] bg-cover bg-center" />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="text-center text-white px-6">
          <h1 className="text-5xl font-bold mb-4">Welcome to TableBooking</h1>
          <p className="text-lg mb-6">
            Discover, explore, and book the best restaurants near you effortlessly!
          </p>
          <Link to="/home">
            <button className="px-6 py-3 bg-white text-blue-500 font-bold rounded-lg hover:bg-gray-100">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;