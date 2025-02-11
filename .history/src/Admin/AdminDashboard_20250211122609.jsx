import React, { useState } from "react";

const AdminDashboard = () => {
  const sampleBookings = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      date: "2025-02-15",
      time: "7:00 PM",
      status: "Confirmed",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      date: "2025-02-16",
      time: "8:30 PM",
      status: "Pending",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michaelbrown@example.com",
      date: "2025-02-17",
      time: "6:00 PM",
      status: "Cancelled",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold text-blue-950">Admin Dashboard</h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">{sampleBookings.length}</h2>
          <p className="text-gray-600">Total Bookings</p>
        </div>
      </div>

      {/* Bookings Table Section */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-blue-950">Recent Bookings</h2>

        {sampleBookings.length === 0 ? (
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
              {sampleBookings.map((booking) => (
                <tr key={booking.id} className="border-b">
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
