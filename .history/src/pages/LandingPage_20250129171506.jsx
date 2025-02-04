import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background image grid */}
      <div className="absolute inset-0 grid grid-cols-3 gap-0">
        <div className="bg-[url('/images/party_1.jpg')] bg-cover bg-center h-full" />
        <div className="bg-[url('/images/party_2.png')] bg-cover bg-center h-full" />
        <div className="bg-[url('/images/party_3.jpg')] bg-cover bg-center h-full" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Welcome Content */}
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="px-6 text-center text-white">
          <h1 className="mb-4 text-5xl font-bold">Welcome to TableBooking</h1>
          <p className="mb-6 text-lg">
            Discover, explore, and book the best restaurants near you effortlessly!
          </p>
          <Link to="/home">
            <button className="px-6 py-3 font-bold text-blue-500 bg-white rounded-lg hover:bg-gray-100">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Restaurant Grid (Outside the Photo Grid) */}
      <div className="relative z-10 pt-16 pb-8 bg-white">
        <h2 className="mb-6 text-3xl font-bold text-center">Featured Restaurants</h2>
        <div className="grid grid-cols-1 gap-8 px-6 md:grid-cols-2 lg:grid-cols-3 animate-slide-up">
          {/* Restaurant Cards */}
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <img src="/images/chipsy.png" alt="Restaurant 1" className="object-cover w-full h-40 mb-4 rounded-lg" />
            <h3 className="text-xl font-semibold">Chipsy</h3>
            <p className="text-gray-600">Tibetan Cuisine</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <img src="/images/hyatt.png" alt="Restaurant 2" className="object-cover w-full h-40 mb-4 rounded-lg" />
            <h3 className="text-xl font-semibold">Hyatt</h3>
            <p className="text-gray-600">Nepali Cuisine</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <img src="/images/restaurant3.png" alt="Restaurant 3" className="object-cover w-full h-40 mb-4 rounded-lg" />
            <h3 className="text-xl font-semibold">Restaurant 3</h3>
            <p className="text-gray-600">Indian Cuisine</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
