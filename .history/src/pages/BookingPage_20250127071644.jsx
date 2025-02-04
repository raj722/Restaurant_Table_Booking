import React, { useState } from "react";
import { Calendar, Clock, Users, Search } from "lucide-react";

const BookingPage = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [location, setLocation] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const restaurants = [
    {
      name: "Chipsy",
      rating: "Exceptional",
      reviews: "615",
      price: "NRS",
      cuisine: "Tibetan",
      location: "Old-Baneshwor",
      times: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM"],
      image: "/images/chipsy.png",
    },
    {
      name: "Hyatt",
      rating: "Awesome",
      reviews: "1595",
      price: "NRS",
      cuisine: "Nepali",
      location: "Boudha",
      times: ["6:30 PM", "6:45 PM", "7:15 PM", "7:30 PM"],
      image: "/images/hyatt.png",
    },
    {
      name: "Everest Dine",
      rating: "Excellent",
      reviews: "1203",
      price: "NRS",
      cuisine: "Nepali",
      location: "Thamel",
      times: ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM"],
      image: "/images/Everest_dine.png",
    },
    {
      name: "Durbar Palace",
      rating: "Great",
      reviews: "870",
      price: "NRS",
      cuisine: "Fusion",
      location: "Lazimpat",
      times: ["3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"],
      image: "/images/durbar_palace.png",
    },
  ];

  // Filter restaurants based on user input
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesDate = date ? true : true; // Add date filtering logic if needed
    const matchesTime = time ? restaurant.times.includes(time) : true;
    const matchesLocation = location
      ? restaurant.location.toLowerCase().includes(location.toLowerCase())
      : true;
    return matchesDate && matchesTime && matchesLocation;
  });

  // Handle booking confirmation
  const handleBooking = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };

  return (
    <div
      className="min-h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url('/images/background.png')`,
      }}
    >
      <div className="px-4 py-8 mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-center md:text-4xl text-blue-950">
          Restaurants in Kathmandu
        </h1>

        {/* Filter Section */}
        <div className="flex flex-col gap-4 p-4 mb-8 bg-white rounded-lg shadow-md md:flex-row">
          <div className="flex items-center flex-1 px-3 py-2 border rounded-md">
            <Calendar className="w-5 h-5 mr-2 text-gray-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full focus:outline-none"
            />
          </div>

          <div className="flex items-center flex-1 px-3 py-2 border rounded-md">
            <Clock className="w-5 h-5 mr-2 text-gray-400" />
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full focus:outline-none"
            >
              <option value="">Select time</option>
              <option value="17:00">5:00 PM</option>
              <option value="17:30">5:30 PM</option>
              <option value="18:00">6:00 PM</option>
              <option value="18:30">6:30 PM</option>
            </select>
          </div>

          <div className="flex items-center px-3 py-2 border rounded-md">
            <Users className="w-5 h-5 mr-2 text-gray-400" />
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} people
                </option>
              ))}
            </select>
          </div>

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

          <button className="px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700">
            Find a table
          </button>
        </div>

        {/* Restaurant Cards Section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant, index) => (
              <div
                key={restaurant.name}
                className="overflow-hidden transition-transform duration-300 transform rounded-lg shadow-md bg-white/90 backdrop-blur-sm hover:scale-105 hover:shadow-lg"
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-xl font-bold">
                      {index + 1}. {restaurant.name}
                    </h2>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm">{restaurant.rating}</span>
                      <span className="text-sm text-gray-500">
                        ({restaurant.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-gray-700">{restaurant.price}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-700">{restaurant.cuisine}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-700">{restaurant.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.times.map((time) => (
                      <button
                        key={time}
                        className="px-4 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                        onClick={() => handleBooking(restaurant)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No restaurants match your filters.
            </p>
          )}
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-11/12 max-w-md p-6 bg-white rounded-lg">
            <h2 className="mb-4 text-xl font-bold">Confirm Booking</h2>
            <p>
              You are booking a table at <strong>{selectedRestaurant?.name}</strong>.
            </p>
            <div className="mt-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Contact Number</label>
              <input
                type="tel"
                placeholder="Enter your contact number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                onClick={() => setShowModal(false)}
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;