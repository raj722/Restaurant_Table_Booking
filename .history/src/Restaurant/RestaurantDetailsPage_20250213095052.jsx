import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Clock, Phone, MapPin } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import KhaltiCheckout from "khalti-checkout-web"; /

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservationData, setReservationData] = useState({
    time: "",
    guests: 1,
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const publicKey = import.meta.env.VITE_KHALTI_PUBLIC_KEY;

  console.log("Khalti Public Key:", publicKey); 

  if (!publicKey) {
    console.warn("Khalti public key is missing. Make sure it's in .env.local");
  }

  const config = {
    publicKey: publicKey || "3f5e7019049541ccb303dcaee93b4d6a", 
    productName: "Table Reservation",
    productUrl: window.location.href,
    eventHandler: {
      onSuccess(payload) {
        console.log("Payment Successful:", payload);
        alert("Payment confirmed! Table booked successfully.");
        setShowPopup(false);
      },
      onError(error) {
        console.log("Payment Error:", error);
        alert("Payment failed. Please try again.");
      },
      onClose() {
        console.log("Payment window closed.");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  const checkout = new KhaltiCheckout(config);

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
      <div className="flex items-center justify-center min-h-screen">
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
    if (!publicKey) {
      alert("Payment gateway is not configured. Please contact support.");
      return;
    }
    checkout.show({ amount: 50000 }); 
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 md:p-6">
      <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-md max-w-7xl">
        {/* Restaurant Details Header */}
        <div className="relative h-96">
          <img src={restaurant.mainImage} alt={restaurant.name} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30">
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                {restaurant.name}
              </h1>
              <div className="flex items-center mt-4 space-x-4 text-white/90">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {restaurant.location}
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  {restaurant.rating} ({restaurant.reviews} reviews)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-2xl font-bold">About</h2>
                <p className="text-gray-700">{restaurant.description}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-6 text-2xl font-bold">Book a Table</h2>
                <form onSubmit={handleReservationSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 text-gray-700">Select Date</label>
                    <Calendar
                      value={selectedDate}
                      onChange={setSelectedDate}
                      minDate={new Date()}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Time</label>
                    <input type="time" name="time" className="w-full px-4 py-2 border rounded-lg" required />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Guests</label>
                    <input type="number" name="guests" min="1" className="w-full px-4 py-2 border rounded-lg" required />
                  </div>
                  <button type="submit" className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Book Table
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-lg w-96">
              <h2 className="mb-4 text-xl font-semibold">Confirm Your Reservation</h2>
              <p className="mb-4 text-gray-700">A reservation fee of Rs. 500 is required.</p>
              <div className="flex justify-end space-x-4">
                <button onClick={() => setShowPopup(false)} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg">
                  Cancel
                </button>
                <button onClick={confirmPayment} className="px-4 py-2 text-white bg-green-600 rounded-lg">
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
