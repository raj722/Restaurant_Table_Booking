import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Clock, Phone, MapPin } from "lucide-react";

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const [reservationData, setReservationData] = useState({
    date: "",
    time: "",
    guests: 1,
    specialRequests: ""
  });
  const [showPopup, setShowPopup] = useState(false);

  const restaurants = [
    {
      id: "1",
      name: "Chipsy",
      rating: "Exceptional",
      reviews: "615",
      location: "Old-Baneshwor",
      description: "Experience authentic Tibetan cuisine in the heart of Old-Baneshwor.",
      mainImage: "/images/chipsy.jpg",
      openingHours: {
        weekdays: "10:00 AM - 10:00 PM",
        weekends: "11:00 AM - 11:00 PM"
      },
      contact: {
        phone: "+977 1234567890",
        email: "info@chipsy.com"
      }
    }
  ];

  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }

  const handleReservationChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        <img src={restaurant.mainImage} alt={restaurant.name} className="object-cover w-full h-64" />
        <div className="p-6">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <div className="flex items-center mt-2 space-x-4 text-gray-700">
            <MapPin className="w-5 h-5" /> {restaurant.location}
            <Star className="w-5 h-5 text-yellow-500" /> {restaurant.rating} ({restaurant.reviews} reviews)
          </div>
          <p className="mt-4 text-gray-600">{restaurant.description}</p>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Book a Table</h2>
            <form className="mt-4 space-y-4">
              <input type="date" name="date" value={reservationData.date} onChange={handleReservationChange} className="w-full p-2 border rounded" required />
              <input type="time" name="time" value={reservationData.time} onChange={handleReservationChange} className="w-full p-2 border rounded" required />
              <input type="number" name="guests" min="1" value={reservationData.guests} onChange={handleReservationChange} className="w-full p-2 border rounded" required />
              <textarea name="specialRequests" value={reservationData.specialRequests} onChange={handleReservationChange} rows="3" className="w-full p-2 border rounded" placeholder="Special Requests"></textarea>
              <button type="button" onClick={() => setShowPopup(true)} className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700">Book Table</button>
            </form>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold">Confirm Reservation</h2>
            <p className="mt-2">Reservation Fee: <span className="font-semibold">Rs. 500</span></p>
            <div className="mt-4 space-y-2">
              <button className="w-full p-2 text-white bg-green-600 rounded hover:bg-green-700">Pay with Payment</button>
              <button className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700">Confirm</button>
              <button onClick={() => setShowPopup(false)} className="w-full p-2 text-white bg-red-600 rounded hover:bg-red-700">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailsPage;
