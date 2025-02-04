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

      {/* Content */}
      <section className="relative flex items-center justify-center min-h-screen p-6">
        <div className="px-6 text-center text-white">
          <h1 className="mb-4 text-5xl font-bold">Welcome to TableBooking</h1>
          <p className="mb-6 text-lg">
            Discover, explore, and book the best restaurants near you effortlessly!
          </p>
          <Link to="#featured-restaurants">
            <button className="px-6 py-3 font-bold text-blue-500 bg-white rounded-lg hover:bg-gray-100">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Restaurants Section */}
      <section id="featured-restaurants" className="relative min-h-screen p-6 mt-10">
        <h2 className="mb-8 text-3xl font-bold text-center">Featured Restaurants</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Add your restaurant cards here */}
          <div className="p-4 bg-white rounded-lg shadow-md">Restaurant 1</div>
          <div className="p-4 bg-white rounded-lg shadow-md">Restaurant 2</div>
          <div className="p-4 bg-white rounded-lg shadow-md">Restaurant 3</div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
