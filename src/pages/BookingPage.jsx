import React, { useState } from "react";
import { Calendar, Clock, Users, Search } from "lucide-react";

const BookingPage = () => {
 const [date, setDate] = useState("");
 const [time, setTime] = useState("");
 const [guests, setGuests] = useState("2");
 const [location, setLocation] = useState("");

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

 return (
  <div
  className="min-h-screen bg-cover bg-center"
  style={{
    backgroundImage: `url('/images/background.png')`,
  }}
>
  <div className="max-w-7xl mx-auto px-4 py-8">
    <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-950">
      Restaurants in Kathmandu
    </h1>

    {/* Filter Section */}
    <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-md mb-8">
      <div className="flex items-center border rounded-md px-3 py-2 flex-1">
        <Calendar className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full focus:outline-none"
        />
      </div>

      <div className="flex items-center border rounded-md px-3 py-2 flex-1">
        <Clock className="w-5 h-5 text-gray-400 mr-2" />
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

      <div className="flex items-center border rounded-md px-3 py-2">
        <Users className="w-5 h-5 text-gray-400 mr-2" />
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

      <div className="flex items-center border rounded-md px-3 py-2 flex-1">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location or Restaurant"
          className="w-full focus:outline-none"
        />
      </div>

      <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700">
        Find a table
      </button>
    </div>

    {/* Restaurant Cards Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {restaurants.map((restaurant, index) => (
        <div
          key={restaurant.name}
          className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold">
                {index + 1}. {restaurant.name}
              </h2>
              <div className="flex items-center">
                <span className="text-sm mr-2">{restaurant.rating}</span>
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
                  className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 text-sm"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
 );
};

export default BookingPage;