import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Clock, Phone, MapPin } from "lucide-react";
import KhaltiCheckout from "khalti-checkout-web";

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const [reservationData, setReservationData] = useState({
    date: "",
    time: "",
    guests: 1,
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const restaurant = {
    id: "1",
    name: "Chipsy",
    rating: "Exceptional",
    reviews: "615",
    location: "Old-Baneshwor",
    description: "Experience authentic Tibetan cuisine in the heart of Old-Baneshwor.",
    mainImage: "/images/chipsy.jpg",
    openingHours: {
      weekdays: "10:00 AM - 10:00 PM",
      weekends: "11:00 AM - 11:00 PM",
    },
    contact: {
      phone: "+977 1234567890",
      email: "info@chipsy.com",
    },
  };

  const handleReservationChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handlePayment = () => {
    let config = {
      publicKey: "test_public_key_3f5e7019049541ccb303dcaee93b4d6a",
      productIdentity: restaurant.id,
      productName: "Table Booking",
      productUrl: window.location.href,
      eventHandler: {
        onSuccess(payload) {
          alert("Payment Successful! Transaction ID: " + payload.token);
          setShowConfirmation(false);
        },
        onError(error) {
          alert("Payment Failed. Please try again.");
        },
      },
    };

    let checkout = new KhaltiCheckout(config);
    checkout.show({ amount: 500 * 100 }); // NRS 500
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        <img src={restaurant.mainImage} alt={restaurant.name} className="object-cover w-full h-64" />
        <div className="p-6">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <div className="flex items-center mt-2 space-x-4 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{restaurant.location}</span>
          </div>
          <p className="mt-4 text-gray-700">{restaurant.description}</p>

          <div className="p-4 mt-6 rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold">Book a Table</h2>
            <form onSubmit={handleReservationSubmit} className="mt-4 space-y-4">
              <input type="date" name="date" value={reservationData.date} onChange={handleReservationChange} required className="w-full p-2 border rounded" />
              <input type="time" name="time" value={reservationData.time} onChange={handleReservationChange} required className="w-full p-2 border rounded" />
              <input type="number" name="guests" value={reservationData.guests} onChange={handleReservationChange} min="1" required className="w-full p-2 border rounded" />
              <textarea name="specialRequests" value={reservationData.specialRequests} onChange={handleReservationChange} rows="2" className="w-full p-2 border rounded" placeholder="Special Requests"></textarea>
              <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded">Proceed to Payment</button>
            </form>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold">Confirm Payment</h2>
            <p className="mt-2 text-gray-700">You need to pay <strong>NRS 500</strong> to confirm your booking.</p>
            <div className="flex justify-end mt-4 space-x-4">
              <button onClick={() => setShowConfirmation(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handlePayment} className="px-4 py-2 text-white bg-green-600 rounded">Pay Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailsPage;
