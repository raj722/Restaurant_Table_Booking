import React from "react";
import { useParams } from "react-router-dom";

const RestaurantDetailsPage = () => {
  const { id } = useParams(); // Get the restaurant ID from the URL

  // Sample restaurant data (replace with data from your backend later)
  const restaurant = {
    id: 1,
    name: "Chipsy",
    rating: "Exceptional",
    reviews: "615",
    price: "NRS",
    cuisine: "Tibetan",
    location: "Old-Baneshwor",
    image: "/images/chipsy.png",
    menu: [
      { name: "Momo", price: "NRS 200" },
      { name: "Thukpa", price: "NRS 250" },
      { name: "Tingmo", price: "NRS 150" },
    ],
    photos: ["/images/chipsy.png", "/images/chipsy_interior.jpg"],
    openingHours: "10:00 AM - 10:00 PM",
    contact: "+977 1234567890",
  };

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
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <h1 className="text-4xl font-bold text-white">{restaurant.name}</h1>
          </div>
        </div>

        {/* Restaurant Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left Column: Menu and Photos */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Menu</h2>
              <ul className="space-y-2">
                {restaurant.menu.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </li>
                ))}
              </ul>

              <h2 className="mt-6 mb-4 text-2xl font-bold">Photos</h2>
              <div className="grid grid-cols-2 gap-4">
                {restaurant.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Restaurant ${index + 1}`}
                    className="object-cover w-full h-32 rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Reviews, Opening Hours, and Reservation Form */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-gray-700">"Amazing food and service!"</p>
                  <p className="text-sm text-gray-500">- John Doe</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-gray-700">"Loved the ambiance!"</p>
                  <p className="text-sm text-gray-500">- Jane Smith</p>
                </div>
              </div>

              <h2 className="mt-6 mb-4 text-2xl font-bold">Opening Hours</h2>
              <p className="text-gray-700">{restaurant.openingHours}</p>

              <h2 className="mt-6 mb-4 text-2xl font-bold">Contact</h2>
              <p className="text-gray-700">{restaurant.contact}</p>

              {/* Reservation Form */}
              <h2 className="mt-6 mb-4 text-2xl font-bold">Book a Table</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Number of Guests</label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} people
                      </option>
                    ))}
                  </select>
                </div>
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
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;