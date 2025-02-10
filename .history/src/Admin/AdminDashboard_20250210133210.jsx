import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/bookings`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        return response.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold text-blue-950">Admin Dashboard</h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">{bookings.length}</h2>
          <p className="text-gray-600">Total Bookings</p>
        </div>
      </div>

      {/* Bookings Table Section */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-blue-950">Recent Bookings</h2>

        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : bookings.length === 0 ? (
          <p>No bookings available.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{booking.name}</td>
                  <td className="p-3">{booking.email}</td>
                  <td className="p-3">{booking.date}</td>
                  <td className="p-3">{booking.time}</td>
                  <td className="p-3">{booking.status}</td>
                  <td className="p-3">
                    <button className="text-blue-500 hover:text-blue-700">Edit</button>
                    <button className="ml-2 text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;