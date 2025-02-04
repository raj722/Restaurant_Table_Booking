import React, { useState } from "react";
import { useParams } from "react-router-dom";

const RestaurantDetailsPage = () => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [search, setSearch] = useState("");

  // Sample restaurant data
  const restaurants = [
    {
      id: "1",
      name: "Chipsy",
      image: "/images/chipsy.png",
    },
    {
      id: "2",
      name: "Hyatt",
      image: "/images/hyatt.png",
    },
  ];

  // Find the restaurant by ID
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return <div className="text-center text-red-500">Restaurant not found.</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-md max-w-7xl">
        {/* Restaurant Header */}
        <div className="relative h-64">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <h1 className="text-4xl font-bold text-white">{restaurant.name}</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Reservation Form */}
        <div className="p-6">
          <h2 className="mb-4 text-2xl font-bold">Book a Table</h2>
          <form className="space-y-4">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
