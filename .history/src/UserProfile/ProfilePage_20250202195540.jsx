import React, { useState } from "react";

function ProfilePage() {
  // Simulated user data (Later, you can fetch from a database)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, City, Country",
    profilePic: "/images/profile-placeholder.png",
  });

  // Simulated booking data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      restaurant: "The Gourmet Spot",
      date: "2025-02-10",
      time: "7:00 PM",
      table: "Table 5",
      guests: 2,
      price: "$50",
      status: "Paid",
    },
    {
      id: 2,
      restaurant: "Ocean Breeze Diner",
      date: "2025-02-15",
      time: "8:30 PM",
      table: "Table 12",
      guests: 4,
      price: "$100",
      status: "Pending",
    },
  ]);

  // Function to cancel booking
  const cancelBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-md p-6 text-center bg-white shadow-lg rounded-2xl">
        {/* Profile Image */}
        <img 
          src={user.profilePic} 
          alt="Profile" 
          className="w-24 h-24 mx-auto border-4 border-gray-300 rounded-full"
        />

        {/* User Info */}
        <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">{user.phone}</p>
        <p className="text-gray-600">{user.address}</p>

        {/* Edit Profile & Logout Buttons */}
        <div className="flex flex-col mt-4 space-y-3">
          <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
          <button className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>

      {/* Booking Details */}
      <div className="w-full max-w-md p-6 mt-6 bg-white shadow-lg rounded-2xl">
        <h3 className="text-lg font-semibold text-center">Your Bookings</h3>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="p-4 border-b border-gray-200">
              <p><strong>Restaurant:</strong> {booking.restaurant}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Table:</strong> {booking.table}</p>
              <p><strong>Guests:</strong> {booking.guests}</p>
              <p><strong>Price:</strong> {booking.price}</p>
              <p className={`font-semibold ${booking.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
                {booking.status}
              </p>
              {/* Edit & Cancel Buttons */}
              <div className="flex justify-between mt-2">
                <button className="px-3 py-1 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600">
                  Edit
                </button>
                <button 
                  className="px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
                  onClick={() => cancelBooking(booking.id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-4 text-center text-gray-600">No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
