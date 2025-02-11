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

  const handleBookTableClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConfirmBooking = () => {
    setShowPopup(false);
    setNotification({ type: "success", message: "Reservation confirmed!" });
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 md:p-6">
      <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-md max-w-7xl">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="mb-6 text-2xl font-bold">Book a Table</h2>
          {notification && (
            <div className={`p-4 mb-4 rounded-lg ${notification.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {notification.message}
            </div>
          )}
          <button 
            onClick={handleBookTableClick} 
            className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg focus:outline-none hover:bg-blue-700"
          >
            Book Table
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Confirm Reservation</h2>
            <p className="mb-4">Reservation Fee: Rs. 500</p>
            <div className="flex space-x-4">
              <button onClick={handleConfirmBooking} className="px-4 py-2 text-white bg-green-500 rounded-lg">Confirm</button>
              <button onClick={handleClosePopup} className="px-4 py-2 text-white bg-gray-500 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailsPage;
