import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  Clock,
  Phone,
  Users,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reservationData, setReservationData] = useState({
    date: "",
    time: "",
    guests: 1,
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Static Restaurant Data
  const restaurant = {
    name: "The Grand Dine",
    location: "Kathmandu, Nepal",
    rating: 4.8,
    reviews: 120,
    mainImage: "https://source.unsplash.com/800x600/?restaurant",
    description:
      "The Grand Dine offers a luxurious dining experience with exquisite cuisines and a warm ambiance.",
    openingHours: {
      weekdays: "10:00 AM - 10:00 PM",
      weekends: "9:00 AM - 11:00 PM",
    },
    contact: {
      phone: "+977-9800000000",
      email: "info@granddine.com",
    },
    menu: {
      popular: [
        { name: "Grilled Chicken", price: "500" },
        { name: "Pasta Alfredo", price: "600" },
        { name: "Tandoori Platter", price: "750" },
      ],
    },
    gallery: [
      "https://source.unsplash.com/600x400/?food",
      "https://source.unsplash.com/600x400/?dining",
      "https://source.unsplash.com/600x400/?restaurant",
    ],
  };

  // Khalti Checkout
  const handleKhaltiPayment = () => {
    const config = {
      publicKey: process.env.NEXT_PUBLIC_KHALTI_PUBLIC_KEY,
      productIdentity: "table_booking_" + id,
      productName: "Table Booking",
      productUrl: window.location.href,
      paymentPreference: ["KHALTI"],
      eventHandler: {
        onSuccess(payload) {
          console.log("Payment Successful!", payload);
          setNotification({
            type: "success",
            message: "Payment successful! Your table is booked.",
          });
          setShowPaymentModal(false);
        },
        onError(error) {
          console.log("Payment Failed!", error);
          setNotification({
            type: "error",
            message: "Payment failed. Please try again.",
          });
          setShowPaymentModal(false);
        },
        onClose() {
          console.log("Payment window closed.");
          setShowPaymentModal(false);
        },
      },
    };

    const checkout = new KhaltiCheckout(config);
    checkout.show({ amount: 50000 });
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulated booking process (No backend interaction)
    setTimeout(() => {
      setLoading(false);
      setShowPaymentModal(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 md:p-6">
      {/* Payment Confirmation Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="p-6 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-xl font-bold">Confirm Payment</h2>
            <p className="mb-4">You need to pay Rs 500 to confirm your booking.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleKhaltiPayment}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Pay with Khalti
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restaurant Details */}
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
        <div className="grid grid-cols-1 gap-8 p-6 md:p-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-2xl font-bold">About</h2>
              <p className="text-gray-700">{restaurant.description}</p>
            </div>

            {/* Gallery */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">Photo Gallery</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {restaurant.gallery.map((photo, index) => (
                  <div key={index} className="relative overflow-hidden rounded-lg cursor-pointer aspect-square group">
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
              {restaurant.menu.popular.map((item, index) => (
                <div key={index} className="flex justify-between p-4 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600">NRS {item.price}</span>
                </div>
              ))}
            </div>

            {/* Reservation Form */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Book a Table</h2>
              <form onSubmit={handleReservationSubmit} className="space-y-4">
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
  );
};

export default RestaurantDetailsPage;
