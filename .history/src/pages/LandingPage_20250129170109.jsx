import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background image grid */}
      <div className="absolute inset-0 grid grid-cols-3 gap-0">
        <div className="bg-[url('/images/party_1.jpg')] bg-cover bg-center" />
        <div className="bg-[url('/images/party_2.png')] bg-cover bg-center" />
        <div className="bg-[url('/images/party_3.jpg')] bg-cover bg-center" />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Welcome Label */}
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

      {/* Scroll Down Indicator */}
      <div className="absolute text-xl text-white transform -translate-x-1/2 bottom-10 left-1/2">
        <p>Scroll down to explore restaurants</p>
      </div>

      {/* Restaurant Table Section (appears on scroll) */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-100" id="restaurants">
        <h2 className="mb-6 text-3xl font-bold">Our Featured Restaurants</h2>
        <div className="flex w-full space-x-6 overflow-x-scroll">
          {/* Example Restaurant Cards */}
          <div className="w-64 p-4 bg-white rounded-lg shadow-lg">
            <img
              src="/images/chipsy.png"
              alt="Chipsy"
              className="object-cover w-full h-40 rounded-lg"
            />
            <h3 className="mt-4 text-xl font-semibold">Chipsy</h3>
            <p className="text-gray-500">Tibetan Cuisine</p>
            <Link to="/restaurant/1">
              <button className="w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                View Details
              </button>
            </Link>
          </div>

          <div className="w-64 p-4 bg-white rounded-lg shadow-lg">
            <img
              src="/images/hyatt.png"
              alt="Hyatt"
              className="object-cover w-full h-40 rounded-lg"
            />
            <h3 className="mt-4 text-xl font-semibold">Hyatt</h3>
            <p className="text-gray-500">Nepali Cuisine</p>
            <Link to="/restaurant/2">
              <button className="w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                View Details
              </button>
            </Link>
          </div>

          {/* Add more restaurant cards as needed */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
