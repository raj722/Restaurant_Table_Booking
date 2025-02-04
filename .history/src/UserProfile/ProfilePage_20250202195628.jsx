import React, { useState } from "react";
import { User, Calendar, CreditCard, Edit, Trash2, MapPin, Mail, Phone } from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+977 9876543210",
    address: "Kathmandu, Nepal",
  });

  const [bookings, setBookings] = useState([
    {
      id: 1,
      restaurant: "Chipsy",
      date: "2025-02-15",
      time: "7:00 PM",
      guests: 2,
      price: "NRS 500",
    },
    {
      id: 2,
      restaurant: "Momo Magic",
      date: "2025-02-20",
      time: "8:30 PM",
      guests: 4,
      price: "NRS 1200",
    },
  ]);

  const [editing, setEditing] = useState(null);

  const handleEditBooking = (id) => {
    setEditing(id);
  };

  const handleCancelBooking = (id) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 md:p-6">
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        {/* Profile Section */}
        <div className="relative h-48 bg-blue-600">
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white rounded-t-lg">
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
        <div className="p-6">
          <h2 className="mb-4 text-xl font-bold">My Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-600">No bookings yet.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="p-4 rounded-lg shadow-sm bg-gray-50">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{booking.restaurant}</h3>
                      <p className="text-gray-600">
                        <Calendar className="inline-block w-4 h-4 mr-1" /> {booking.date} at {booking.time}
                      </p>
                      <p className="text-gray-600">
                        <User className="inline-block w-4 h-4 mr-1" /> {booking.guests} guests
                      </p>
                      <p className="text-gray-600">
                        <CreditCard className="inline-block w-4 h-4 mr-1" /> {booking.price}
                      </p>
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
