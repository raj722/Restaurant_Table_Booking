import React, { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import KhaltiCheckout from "khalti-checkout-web";

const BookingPage = () => {
  const [location, setLocation] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const restaurants = [
    { id: "1", name: "Chipsy", location: "Old-Baneshwor", image: "/images/chipsy.png" },
    { id: "2", name: "Hyatt", location: "Boudha", image: "/images/hyatt.png" },
    { id: "3", name: "Everest Dine", location: "Thamel", image: "/images/Everest_dine.png" },
    { id: "4", name: "Durbar Palace", location: "Lazimpat", image: "/images/durbar_palace.png" },
  ];

  const filterRestaurants = () => {
    setFilteredRestaurants(
      location
        ? restaurants.filter((r) => r.location.toLowerCase().includes(location.toLowerCase()))
        : restaurants
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      filterRestaurants();
    }
  };

  // Load Khalti public key from environment variables
  const khaltiPublicKey = import.meta.env.VITE_KHALTI_PUBLIC_KEY;

  const khaltiConfig = {
    publicKey: khaltiPublicKey,
    productIdentity: "1234567890",
    productName: "Table Booking",
    productUrl: "http://localhost:5173/booking",
    eventHandler: {
      onSuccess(payload) {
        console.log("Payment Successful", payload);
        alert("Payment Successful!");
      },
      onError(error) {
        console.log("Payment Error", error);
        alert("Payment Failed!");
      },
      onClose() {
        console.log("Payment Closed");
      },
    },
    paymentPreference: ["KHALTI"],
  };

  const handleKhaltiPayment = () => {
    const checkout = new KhaltiCheckout(khaltiConfig);
    checkout.show({ amount: 1000 * 100 }); // Amount in paisa (Rs. 1000 = 100000 paisa)
  };

  return (
    <div className="min-h-screen bg-center bg-cover" style={{ backgroundImage: `url('/images/background.png')` }}>
      <div className="px-4 py-8 mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-center md:text-4xl text-blue-950">
          Find a Restaurant
        </h1>

        {/* Search Bar */}
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

          <button
            onClick={filterRestaurants}
            className="flex items-center justify-center px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
          >
            Search
          </button>
        </div>

        {/* Restaurant Cards */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="overflow-hidden transition-transform duration-300 transform rounded-lg shadow-md bg-white/90 backdrop-blur-sm hover:scale-105 hover:shadow-lg">
                <img src={restaurant.image} alt={restaurant.name} className="object-cover w-full h-48" />
                <div className="p-4">
                  <h2 className="text-xl font-bold">{restaurant.name}</h2>
                  <p className="text-gray-700">{restaurant.location}</p>
                  {/* Khalti Payment Button */}
                  <button
                    onClick={handleKhaltiPayment}
                    className="px-4 py-2 mt-3 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                  >
                    Pay with Khalti
                  </button>
                </div>
              </div>
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
