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
      {/* Existing page content */}
      
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