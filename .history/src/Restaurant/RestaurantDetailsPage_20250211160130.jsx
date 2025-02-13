import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Clock, Phone, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState({
    date: "",
    time: "",
    guests: 1,
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const restaurants = [
    {
      id: "1",
      name: "Chipsy",
      rating: "Exceptional",
      reviews: "15",
      price: "NRS",
      cuisine: "Tibetan",
      location: "Old-Baneshwor",
      description: "Experience authentic Tibetan cuisine in the heart of Old-Baneshwor.",
      mainImage: "/images/chipsy.jpg",
      openingHours: {
        weekdays: "07:00 AM - 10:00 PM",
        weekends: "08:00 AM - 11:00 PM",
      },
      contact: {
        phone: "+977 9849456897",
        email: "info@chipsy.com",
        address: "123 Old-Baneshwor, Kathmandu",
      },
    },
  ];

  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-4 text-red-600 bg-red-100 rounded-lg">
          Restaurant not found. Please try again or contact support.
        </div>
      </div>
    );
  }

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const confirmPayment = () => {
    setShowPopup(false);
    alert("Payment confirmed! Table booked successfully.");
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-lg max-w-7xl">
        {/* Header Image */}
        <div className="relative h-96">
          <img
            src={restaurant.mainImage}
            alt={restaurant.name}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <h1 className="text-4xl font-bold text-white md:text-5xl">{restaurant.name}</h1>
              <div className="flex items-center mt-4 space-x-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-6 h-6 text-yellow-400" />
                  <span>{restaurant.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <span>{restaurant.rating} ({restaurant.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-8 md:px-12">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left Column - Description & Contact Info */}
            <div className="space-y-8">
              {/* About Section */}
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">About</h2>
                <p className="text-gray-700">{restaurant.description}</p>

                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div className="flex items-center space-x-4">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-semibold">Opening Hours</p>
                      <p className="text-sm text-gray-600">Weekdays: {restaurant.openingHours.weekdays}</p>
                      <p className="text-sm text-gray-600">Weekends: {restaurant.openingHours.weekends}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-semibold">Contact</p>
                      <p className="text-sm text-gray-600">{restaurant.contact.phone}</p>
                      <p className="text-sm text-gray-600">{restaurant.contact.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Reservation Form */}
            <div className="space-y-8">
              {/* Reservation Form */}
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">Book a Table</h2>
                <form onSubmit={handleReservationSubmit} className="space-y-4">
                  <div>
                    <label className="block font-semibold text-gray-700">Date</label>
                    <input
                      type="date"
                      name="date"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700">Time</label>
                    <input
                      type="time"
                      name="time"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700">Guests</label>
                    <input
                      type="number"
                      name="guests"
                      min="1"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full p-3 text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Book Table"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Pop-up Confirmation Box */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-lg w-96">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Confirm Your Reservation</h2>
              <p className="mb-6 text-gray-600">A reservation fee of Rs. 500 is required.</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-6 py-2 text-gray-700 transition-all bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPayment}
                  className="px-6 py-2 text-white transition-all bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Pay & Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
