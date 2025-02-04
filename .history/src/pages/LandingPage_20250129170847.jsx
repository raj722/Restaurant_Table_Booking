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

      {/* Welcome Section */}
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="px-6 py-10 text-center text-white bg-white bg-opacity-50 rounded-lg">
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

      {/* Restaurant Table Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-screen-xl px-6 mx-auto text-center">
          <h2 className="mb-8 text-3xl font-bold">Explore Our Restaurants</h2>
          <p className="mb-12 text-lg">
            Check out the best restaurants to book your next dining experience.
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Restaurant Cards with Slide Animation */}
            <div className="p-6 bg-white rounded-lg shadow-md opacity-0 restaurant-card animate-slide-up">
              <h3 className="mb-2 text-xl font-semibold">Chipsy</h3>
              <p className="text-gray-500">Tibetan Cuisine</p>
              <p className="mt-4">Rating: Exceptional</p>
              <Link to="/restaurant/1">
                <button className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  View Details
                </button>
              </Link>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md opacity-0 restaurant-card animate-slide-up">
              <h3 className="mb-2 text-xl font-semibold">Hyatt</h3>
              <p className="text-gray-500">Nepali Cuisine</p>
              <p className="mt-4">Rating: Awesome</p>
              <Link to="/restaurant/2">
                <button className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  View Details
                </button>
              </Link>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md opacity-0 restaurant-card animate-slide-up">
              <h3 className="mb-2 text-xl font-semibold">Taj Mahal</h3>
              <p className="text-gray-500">Indian Cuisine</p>
              <p className="mt-4">Rating: Excellent</p>
              <Link to="/restaurant/3">
                <button className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  View Details
                </button>
              </Link>
            </div>
            {/* Add more restaurant cards as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
