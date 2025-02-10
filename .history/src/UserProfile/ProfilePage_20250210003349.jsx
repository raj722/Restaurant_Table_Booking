import React, { useState, useEffect } from "react";
import { User, Calendar, CreditCard, Edit, Trash2, MapPin, Mail, Phone } from "lucide-react";
import { auth } from "../config/firebase";

const ProfilePage = () => {
  const { user } = Auth(); // Get logged-in user from the AuthContext
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) {
      // Fetch bookings from Firestore based on logged-in user's ID
      const fetchBookings = async () => {
        const bookingsRef = firestore.collection("bookings").where("userId", "==", user.uid);
        const snapshot = await bookingsRef.get();
        const fetchedBookings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(fetchedBookings);
      };

      fetchBookings();
    }
  }, [user]);

  const [editing, setEditing] = useState(null);

  const handleEditBooking = (id) => {
    setEditing(id);
  };

  const handleCancelBooking = (id) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  if (!user) {
    return <p>Loading...</p>; // Optionally show a loading state while user is being fetched
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100 md:p-6">
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        {/* Profile Section */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white rounded-t-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <div className="mt-2 text-gray-600">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" /> {user.email}
              </div>
              <div className="flex items-center mt-1">
                <Phone className="w-5 h-5 mr-2" /> {user.phone}
              </div>
              <div className="flex items-center mt-1">
                <MapPin className="w-5 h-5 mr-2" /> {user.address}
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="p-6 space-y-6">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">My Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-600">No bookings yet.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className={`p-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${
                    booking.status === "Upcoming" ? "bg-white" : "bg-gray-50"
                  } ${booking.status === "Completed" ? "border-l-4 border-green-500" : ""}`}
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{booking.restaurant}</h3>
                      <p className="text-gray-600">
                        <Calendar className="inline-block w-4 h-4 mr-1" /> {booking.date} at {booking.time}
                      </p>
                      <p className="text-gray-600">
                        <User className="inline-block w-4 h-4 mr-1" /> {booking.guests} guests
                      </p>
                      <p className="text-gray-600">
                        <CreditCard className="inline-block w-4 h-4 mr-1" /> {booking.price}
                      </p>
                      {/* Display booking status */}
                      <p className="mt-2 text-sm text-gray-500">Status: {booking.status}</p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        className="p-2 text-blue-600 transition-colors rounded-lg hover:bg-blue-100"
                        onClick={() => handleEditBooking(booking.id)}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-red-600 transition-colors rounded-lg hover:bg-red-100"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Invoice Section for completed bookings */}
                  {booking.status === "Completed" && (
                    <div className="p-3 mt-4 bg-gray-100 rounded-md">
                      <h4 className="font-semibold text-gray-800">Invoice</h4>
                      <p className="text-gray-600">Date of Booking: {booking.date}</p>
                      <p className="text-gray-600">Amount: {booking.price}</p>
                      <p className="text-gray-600">Status: {booking.status}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
