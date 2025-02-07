import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Calendar, Phone, Mail, MapPin } from "lucide-react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div className="text-red-500">{text}</div>;

function RestaurantPage() {
  // Sample data for booked tables with user contact details
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

  const defaultProps = {
    center: {
      lat: 27.7172,
      lng: 85.3240,
    },
    zoom: 14,
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Restaurant Dashboard</h1>
      <p>Manage your restaurant tables, bookings, and location in real-time.</p>

      <Link 
        to="/restaurant/update-table" 
        className="inline-block px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Update Tables
      </Link>

      <Link 
        to="/restaurant/bookings-management" 
        className="inline-block px-4 py-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700"
      >
        Bookings Management
      </Link>

      <Link 
        to="/restaurant/customer-details/1" 
        className="inline-block px-4 py-2 mt-4 text-white bg-yellow-600 rounded hover:bg-yellow-700"
      >
        View Customer Details
      </Link>

      {/* Google Maps Section */}
      <div className="mt-6">
        <h2 className="mb-2 text-lg font-semibold">Restaurant Location</h2>
        <div className="w-full h-64 overflow-hidden rounded-lg shadow-lg">
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent lat={27.7172} lng={85.3240} text={<MapPin className="text-red-500" />} />
          </GoogleMapReact>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="mt-6">
        <h2 className="mb-2 text-lg font-semibold">Booked Tables</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-600">No bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">{booking.customerName}</h3>
                <p className="text-gray-600">
                  <Mail className="inline-block w-4 h-4 mr-1" /> {booking.email}
                </p>
                <p className="text-gray-600">
                  <Phone className="inline-block w-4 h-4 mr-1" /> {booking.phone}
                </p>
                <p className="text-gray-600">
                  <Calendar className="inline-block w-4 h-4 mr-1" /> {booking.date} at {booking.time}
                </p>
                <p className="text-gray-600">
                  <User className="inline-block w-4 h-4 mr-1" /> {booking.guests} guests, {booking.table}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantPage;
