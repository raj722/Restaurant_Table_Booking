import React from "react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold text-blue-950">Admin Dashboard</h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">8,282</h2>
          <p className="text-gray-600">New Users</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">200,521</h2>
          <p className="text-gray-600">Total Bookings</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">215,542</h2>
          <p className="text-gray-600">Available Tables</p>
        </div>
      </div>

      {/* Bookings Table Section */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-blue-950">Recent Bookings</h2>
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
            {[
              { name: "John Doe", email: "john@example.com", date: "2023-10-01", time: "19:00", status: "Confirmed" },
              { name: "Jane Smith", email: "jane@example.com", date: "2023-10-02", time: "20:00", status: "Pending" },
              // Add more bookings as needed
            ].map((booking, index) => (
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
      </div>
    </div>
  );
};

export default AdminDashboard;