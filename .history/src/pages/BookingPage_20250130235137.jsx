import React, { useState } from "react";
import { Search } from "lucide-react";

const BookingPage = () => {
  const [location, setLocation] = useState("");

  return (
    <div
      className="min-h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url('/images/background.png')`,
      }}
    >
      <div className="px-4 py-8 mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-center md:text-4xl text-blue-950">
          Find a Restaurant
        </h1>

        {/* Search Bar Section */}
        <div className="flex flex-col gap-4 p-4 mb-8 bg-white rounded-lg shadow-md md:flex-row">
          {/* Location or Restaurant Search */}
          <div className="flex items-center flex-1 px-3 py-2 border rounded-md">
            <Search className="w-5 h-5 mr-2 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location or Restaurant"
              className="w-full focus:outline-none"
            />
          </div>

          {/* Find a Table Button */}
          <button className="px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700">
            Find a Table
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
