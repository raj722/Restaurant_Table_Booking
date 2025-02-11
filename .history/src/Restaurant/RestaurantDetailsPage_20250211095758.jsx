import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Clock, Phone, Users, Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

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

  // Khalti Checkout
  const handleKhaltiPayment = () => {
    const config = {
      publicKey: process.env.NEXT_PUBLIC_KHALTI_PUBLIC_KEY, // Use environment variable
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

          // Send payload to your backend for verification
          fetch(`${process.env.KHALTI_BASE_URL}/payment/verify/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
            },
            body: JSON.stringify(payload),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Payment verified:", data);
              // Update your backend with the verified payment details
            })
            .catch((error) => console.error("Verification error:", error));
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
    checkout.show({ amount: 50000 }); // Amount in paisa (50000 = NPR 500)
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call for reservation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show payment modal
      setShowPaymentModal(true);
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to submit reservation. Please try again.",
      });
    } finally {
      setLoading(false);
    }
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

      {/* Main Content */}
      <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-md max-w-7xl">
        {/* ... (Rest of your existing code) ... */}

        {/* Reservation Form */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="mb-6 text-2xl font-bold">Book a Table</h2>
          {notification && (
            <div
              className={`p-4 mb-4 rounded-lg ${
                notification.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
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
                onChange={(e) =>
                  setReservationData({ ...reservationData, date: e.target.value })
                }
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
                onChange={(e) =>
                  setReservationData({ ...reservationData, time: e.target.value })
                }
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
                onChange={(e) =>
                  setReservationData({ ...reservationData, guests: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Special Requests</label>
              <textarea
                name="specialRequests"
                value={reservationData.specialRequests}
                onChange={(e) =>
                  setReservationData({ ...reservationData, specialRequests: e.target.value })
                }
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
  );
};

export default RestaurantDetailsPage;