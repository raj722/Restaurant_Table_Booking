import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen">
      {/* Welcome Section */}
      <section className="relative min-h-screen">
        {/* Background image grid */}
        <div className="absolute inset-0 grid grid-cols-3 gap-0">
          <div className="bg-[url('/images/party_1.jpg')] bg-cover bg-center h-full" />
          <div className="bg-[url('/images/party_2.png')] bg-cover bg-center h-full" />
          <div className="bg-[url('/images/party_3.jpg')] bg-cover bg-center h-full" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="px-6 text-center text-white">
            <h1 className="mb-4 text-5xl font-bold">Welcome to TableBooking</h1>
            <p className="mb-6 text-lg">
              Discover, explore, and book the best restaurants near you effortlessly!
            </p>
            {/* Link to About Us page */}
            <Link to="/about-us">
              <button className="px-6 py-3 font-bold text-blue-500 bg-white rounded-lg hover:bg-gray-100">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Restaurants Section */}
      <section id="featured-restaurants" className="relative z-10 pt-16 pb-8 bg-white">
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
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-16 bg-gray-100">
        <h2 className="mb-8 text-3xl font-semibold text-center">About Us</h2>
        <div className="container px-6 mx-auto">
          <div className="flex flex-col items-center justify-center md:flex-row">
            {/* Image on the left */}
            <div className="mb-8 md:w-1/2 md:mb-0">
              <img
                src="/images/your-image.jpg" // Replace with your image
                alt="About Us"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Description on the right */}
            <div className="text-center md:w-1/2 md:text-left">
              <p className="text-lg text-gray-700">
                We are passionate about bringing people together through the love of food.
                Our goal is to provide the easiest and most enjoyable restaurant booking experience.
                Whether you're looking for a casual meal or a fine dining experience, we've got you covered.
                Our platform allows you to discover, explore, and book the best restaurants near you effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
