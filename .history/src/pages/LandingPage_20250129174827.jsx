import React, { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  // Simulating a list of restaurants
  const [restaurants, setRestaurants] = useState([
    {
      name: "Chipsy",
      image: "/images/chipsy.png",
      location: "Kathmandu",
    },
    {
      name: "Hyatt",
      image: "/images/hyatt.png",
      location: "Pokhara",
    },
    {
      name: "Restaurant 3",
      image: "/images/restaurant3.png",
      location: "Lalitpur",
    },
  ]);

  // Function to simulate adding a new restaurant dynamically
  const addNewRestaurant = () => {
    setRestaurants([
      ...restaurants,
      {
        name: "New Restaurant",
        image: "/images/new-restaurant.png",
        location: "Bhaktapur",
      },
    ]);
  };

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
            {/* Scroll to Featured Restaurants section */}
            <Link to="#featured-restaurants">
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
          {/* Map through the restaurants and display them */}
          {restaurants.map((restaurant, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="object-cover w-full h-40 mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold">{restaurant.name}</h3>
              <p className="text-gray-600">{restaurant.location}</p>
            </div>
          ))}
        </div>
        {/* Button to add a new restaurant (simulating dynamic updates) */}
        <div className="mt-8 text-center">
          <button
            onClick={addNewRestaurant}
            className="px-6 py-3 font-bold text-blue-500 bg-white rounded-lg hover:bg-gray-100"
          >
            Add New Restaurant
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
