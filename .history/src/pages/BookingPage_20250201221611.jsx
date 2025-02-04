import React, { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link for navigation

const BookingPage = () => {
  const [location, setLocation] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const restaurants = [
    {
      id: "1",
      name: "Chipsy",
      location: "Old-Baneshwor",
      image: "/images/chipsy.png",
    },
    {
      id: "2",
      name: "Hyatt",
      location: "Boudha",
      image: "/images/hyatt.png",
    },
    {
      id: "3",
      name: "Everest Dine",
      location: "Thamel",
      image: "/images/Everest_dine.png",
    },
    {
      id: "4",
      name: "Durbar Palace",
      location: "Lazimpat",
      image: "/images/durbar_palace.png",
    },
  ];

  
  const filterRestaurants = () => {
    const filtered = location
      ? restaurants.filter((restaurant) =>
          restaurant.location.toLowerCase().includes(location.toLowerCase())
        )
      : restaurants;
    setFilteredRestaurants(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      filterRestaurants();
    }
  };

  return (
    <div className="min-h-screen bg-center bg-cover" style={{ backgroundImage: `url('/images/background.png')` }}>
      <div className="px-4 py-8 mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-center md:text-4xl text-blue-950">Find a Restaurant</h1>

        {/* Search Bar Section */}
        <div className="flex flex-col gap-4 p-4 mb-8 bg-white rounded-lg shadow-md md:flex-row">
          <div className="flex items-center flex-1 px-3 py-2 border rounded-md">
            <Search className="w-5 h-5 mr-2 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown} 
              placeholder="Location or Restaurant"
              className="w-full focus:outline-none"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={filterRestaurants}
            className="flex items-center justify-center px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
          >
            Search
          </button>
        </div>

        {/* Restaurant Cards Section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id}>
                <div className="overflow-hidden transition-transform duration-300 transform rounded-lg shadow-md bg-white/90 backdrop-blur-sm hover:scale-105 hover:shadow-lg">
                  <img src={restaurant.image} alt={restaurant.name} className="object-cover w-full h-48" />
                  <div className="p-4">
                    <h2 className="text-xl font-bold">{restaurant.name}</h2>
                    <p className="text-gray-700">{restaurant.location}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No restaurants match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
