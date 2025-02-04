import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch restaurant data from API
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/restaurants/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant data");
        }
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [id]);

  if (loading) {
    return <div className="text-lg text-center">Loading...</div>;
  }

  if (!restaurant) {
    return <div className="text-center text-red-500">Restaurant not found.</div>;
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100">
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

        {/* Restaurant Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left Column: Photos */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Photos</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {restaurant.photos.slice(0, 5).map((photo, index) => (
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
                {restaurant.reviews.map((review, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-50">
                    <p className="text-gray-700">{review.comment}</p>
                    <p className="text-sm text-gray-500">- {review.author}</p>
                  </div>
                ))}
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
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
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
