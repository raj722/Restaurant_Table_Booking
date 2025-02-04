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

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center w-full max-w-md px-3 py-2 border rounded-md">
            <Search className="w-5 h-5 mr-2 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search by location or restaurant"
              className="w-full focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
