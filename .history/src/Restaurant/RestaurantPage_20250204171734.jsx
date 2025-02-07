import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Calendar, Phone, Mail, MapPin } from "lucide-react";
import RestaurantDashboardMap from './RestaurantDashboardMap';

function RestaurantPage() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customerName: "Alice Johnson",
      email: "alice@example.com",
      phone: "+977 9801234567",
      date: "2025-02-10",
      time: "7:30 PM",
      guests: 2,
      table: "Table 5",
    },
    {
      id: 2,
      customerName: "Michael Smith",
      email: "michael@example.com",
      phone: "+977 9812345678",
      date: "2025-02-12",
      time: "8:00 PM",
      guests: 4,
      table: "Table 8",
    },
  ]);

  const [restaurantLocation, setRestaurantLocation] = useState({
    lat: 27.7172,
    lng: 85.3240,
  });

  const handleLocationUpdate = (newLocation) => {
    setRestaurantLocation(newLocation);
    // Here you would typically update this in your backend
    console.log('Location updated:', newLocation);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Restaurant Dashboard</h1>
            <p className="mt-1 text-gray-600">Manage your restaurant tables, bookings, and location in real-time.</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <Link 
              to="/restaurant/update-table" 
              className="inline-flex items-center px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Update Tables
            </Link>
            <Link 
              to="/restaurant/bookings-management" 
              className="inline-flex items-center px-4 py-2 text-white transition-colors bg-green-600 rounded-md hover:bg-green-700"
            >
              Bookings Management
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <RestaurantDashboardMap 
              location={restaurantLocation}
              onLocationUpdate={handleLocationUpdate}
            />
          </div>

          {/* Bookings Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
            {bookings.length === 0 ? (
              <p className="text-gray-600">No bookings yet.</p>
            ) : (
              <div className="grid gap-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="p-4 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{booking.customerName}</h3>
                      <span className="px-2 py-1 text-sm text-green-700 bg-green-100 rounded-full">
                        {booking.table}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-2" /> {booking.email}
                      </p>
                      <p className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2" /> {booking.phone}
                      </p>
                      <p className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" /> {booking.date} at {booking.time}
                      </p>
                      <p className="flex items-center text-gray-600">
                        <User className="w-4 h-4 mr-2" /> {booking.guests} guests
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Today's Bookings</h3>
                <p className="mt-2 text-3xl font-bold text-blue-600">
                  {bookings.length}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Available Tables</h3>
                <p className="mt-2 text-3xl font-bold text-green-600">12</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Total Guests Today</h3>
                <p className="mt-2 text-3xl font-bold text-purple-600">
                  {bookings.reduce((sum, booking) => sum + booking.guests, 0)}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Pending Confirmations</h3>
                <p className="mt-2 text-3xl font-bold text-yellow-600">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantPage;