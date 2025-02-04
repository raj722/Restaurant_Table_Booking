import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Search and Sort Section */}
      <div className="p-4 bg-white shadow-md">
        <div className="flex flex-wrap items-center gap-4 mx-auto max-w-7xl">
          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for restaurants..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Sort Dropdown */}
          <select
            value={sortOption}
            onChange={handleSort}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Sort By</option>
            <option value="rating">Rating</option>
            <option value="distance">Distance</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {/* Page Content */}
      <div className="px-4 mx-auto mt-8 max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold">Explore Restaurants</h1>
        <p>
          Display restaurant listings here based on search and sort filters.
          Current Search Query: <strong>{searchQuery}</strong>, Sort By:{" "}
          <strong>{sortOption}</strong>.
        </p>
        {/* Restaurant Listings */}
      </div>
    </div>
  );
};

export default HomePage;
