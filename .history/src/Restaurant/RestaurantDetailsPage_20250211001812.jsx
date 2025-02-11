import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, Clock, Phone, MapPin, X } from "lucide-react";
import axios from 'axios';

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const [reservationData, setReservationData] = useState({
    date: "",
    time: "",
    guests: 1,
    specialRequests: ""
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);

  useEffect(() => {
    // Dynamically load Khalti SDK
    const script = document.createElement('script');
    script.src = "https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/khalti-checkout.iffe.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!reservationData.date || !reservationData.time) {
      setNotification({
        type: "error",
        message: "Please fill in all required fields."
      });
      return;
    }

    setShowPaymentConfirmation(true);
  };

  const submitReservation = async (transactionDetails) => {
    try {
      const response = await axios.post('/api/reservations', {
        ...reservationData,
        transactionDetails
      });
      return response.data;
    } catch (error) {
      throw new Error('Reservation submission failed');
    }
  };

  const handlePaymentConfirmation = () => {
    const config = {
      publicKey: process.env.NEXT_PUBLIC_KHALTI_PUBLIC_KEY,
      product: {
        name: "Restaurant Reservation",
        amount: 50000, // 500 NRS in paisa
      },
      onSuccess: async (payload) => {
        try {
          await submitReservation(payload);
          
          setNotification({
            type: "success",
            message: "Reservation confirmed! Payment successful."
          });
          
          // Reset form and close modal
          setReservationData({
            date: "",
            time: "",
            guests: 1,
            specialRequests: ""
          });
          setShowPaymentConfirmation(false);
        } catch (error) {
          setNotification({
            type: "error",
            message: "Reservation failed. Please try again."
          });
        }
      },
      onError: (error) => {
        setNotification({
          type: "error",
          message: "Payment failed. Please try again."
        });
      }
    };

    // Initialize Khalti Checkout
    const khaltiCheckout = new KhaltiCheckout(config);
    khaltiCheckout.show(config);
  };

  const PaymentConfirmationModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <button 
          onClick={() => setShowPaymentConfirmation(false)}
          className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="mb-4 text-2xl font-bold text-center">Confirm Reservation</h2>
        
        <div className="mb-4 text-center">
          <p className="text-gray-700">Reservation Details:</p>
          <p className="font-semibold">{reservationData.date} at {reservationData.time}</p>
          <p className="font-semibold">{reservationData.guests} Guest(s)</p>
        </div>
        
        <div className="p-4 mb-6 text-center bg-gray-100 rounded-lg">
          <p className="text-xl font-bold text-gray-800">Total Payment</p>
          <p className="text-3xl font-extrabold text-blue-600">NRS 500</p>
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={() => setShowPaymentConfirmation(false)}
            className="flex-1 px-4 py-3 text-gray-600 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button 
            onClick={handlePaymentConfirmation}
            className="flex-1 px-4 py-3 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 bg-gray-100 md:p-6">
      <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-md max-w-7xl">
              
              <div className="relative h-96">
                <img
                  src={restaurant.mainImage}
                  alt={restaurant.name}
                  className="object-cover w-full h-full"
                />
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
                  {/* Left Column */}
                  <div className="space-y-8">
                    {/* Description */}
                    <div className="p-6 bg-white rounded-lg shadow-sm">
                      <h2 className="mb-4 text-2xl font-bold">About</h2>
                      <p className="text-gray-700">{restaurant.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 mr-2 text-gray-500" />
                          <div>
                            <p className="font-semibold">Opening Hours</p>
                            <p className="text-sm text-gray-600">Weekdays: {restaurant.openingHours.weekdays}</p>
                            <p className="text-sm text-gray-600">Weekends: {restaurant.openingHours.weekends}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 mr-2 text-gray-500" />
                          <div>
                            <p className="font-semibold">Contact</p>
                            <p className="text-sm text-gray-600">{restaurant.contact.phone}</p>
                            <p className="text-sm text-gray-600">{restaurant.contact.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
      
                    {/* Photo Gallery */}
                    <div>
                      <h2 className="mb-6 text-2xl font-bold">Photo Gallery</h2>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {allPhotos.map((photo, index) => (
                          <div 
                            key={index}
                            className="relative overflow-hidden rounded-lg cursor-pointer aspect-square group"
                            onClick={() => {
                              setSelectedImage(photo);
                              setCurrentImageIndex(index);
                            }}
                          >
                            <img
                              src={photo}
                              alt={`Gallery ${index + 1}`}
                              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
      
                  {/* Right Column */}
                  <div className="space-y-8">
                    {/* Popular Items */}
                    <div className="p-6 bg-white rounded-lg shadow-sm">
                      <h2 className="mb-4 text-2xl font-bold">Popular Items</h2>
                      <div className="space-y-4">
                        {restaurant.menu.popular.map((item, index) => (
                          <div key={index} className="flex justify-between p-4 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-gray-600">NRS {item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
      
                    {/* Reservation Form */}
                    <div className="p-6 bg-white rounded-lg shadow-sm">
                      <h2 className="mb-6 text-2xl font-bold">Book a Table</h2>
                      {notification && (
                        <div className={`p-4 mb-4 rounded-lg ${
                          notification.type === "success" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {notification.message}
                        </div>
                      )}
                      <form onSubmit={handleReservationSubmit} className="space-y-4">
                        <div>
                          <label className="block mb-1 text-gray-700">Date</label>
                          <input
                            type="date"
                            name="date"
                            value={reservationData.date}
                            onChange={handleReservationChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-gray-700">Time</label>
                          <input
                            type="time"
                            name="time"
                            value={reservationData.time}
                            onChange={handleReservationChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-gray-700">Guests</label>
                          <input
                            type="number"
                            name="guests"
                            min="1"
                            value={reservationData.guests}
                            onChange={handleReservationChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-gray-700">Special Requests</label>
                          <textarea
                            name="specialRequests"
                            value={reservationData.specialRequests}
                            onChange={handleReservationChange}
                            rows="3"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                        <button 
                          type="submit" 
                          className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg focus:outline-none hover:bg-blue-700"
                          disabled={loading}
                        >
                          {loading ? "Submitting..." : "Book Table"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg ${
          notification.type === "success" 
            ? "bg-green-100 text-green-700" 
            : "bg-red-100 text-red-700"
        }`}>
          {notification.message}
        </div>
      )}
      
      {/* Payment Confirmation Modal */}
      {showPaymentConfirmation && <PaymentConfirmationModal />}
    </div>
  );
};

export default RestaurantDetailsPage;