import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Clock, Phone, Users, Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();  
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reservationData, setReservationData] = useState({
    date: "",
    time: "",
    guests: 1,
    specialRequests: ""
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const restaurants = [
    {
      id: "1",
      name: "Chipsy",
      rating: "Exceptional",
      reviews: "615",
      price: "NRS",
      cuisine: "Tibetan",
      location: "Old-Baneshwor",
      description: "Experience authentic Tibetan cuisine in the heart of Old-Baneshwor.",
      mainImage: "/images/chipsy.jpg",
      photos: {
        interior: ["/images/chipsy-interior1.jpg", "/images/chipsy-interior2.jpg"],
        food: ["/images/chipsy-food1.jpg", "/images/chipsy-food2.jpg"],
        ambiance: ["/images/chipsy-ambiance1.jpg"],
      },
      openingHours: {
        weekdays: "10:00 AM - 10:00 PM",
        weekends: "11:00 AM - 11:00 PM"
      },
      contact: {
        phone: "+977 1234567890",
        email: "info@chipsy.com",
        address: "123 Old-Baneshwor, Kathmandu"
      },
      features: ["Outdoor Seating", "Wheelchair Accessible", "Parking Available"],
      menu: {
        popular: [
          { name: "Momos", price: "250" },
          { name: "Thukpa", price: "300" }
        ]
      }
    }
  ];

  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return <div className="flex items-center justify-center min-h-screen">Restaurant not found.</div>;
  }

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleConfirm = () => {
    setShowPopup(false);
    setNotification({ type: "success", message: "Reservation confirmed! Payment of Rs. 500 received." });
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 md:p-6">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">Book a Table</h2>
        {notification && (
          <div className={`p-4 mb-4 rounded-lg ${notification.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{notification.message}</div>
        )}
        <form onSubmit={handleReservationSubmit} className="space-y-4">
          <button type="submit" className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Book Table</button>
        </form>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Confirm Reservation</h3>
            <p className="mt-2">Reservation fee: Rs. 500</p>
            <div className="flex justify-between mt-4">
              <button onClick={handleConfirm} className="px-4 py-2 text-white bg-green-600 rounded-lg">Pay & Confirm</button>
              <button onClick={handleCancel} className="px-4 py-2 text-white bg-red-600 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailsPage;
