import React, { useState } from "react";
import { useParams } from "react-router-dom";

const RestaurantDetailsPage = () => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-md max-w-7xl">
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
