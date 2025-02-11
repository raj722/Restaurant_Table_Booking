import React, { useState } from "react";

const Reservations = () => {
  const [filter, setFilter] = useState("all");

  // Example reservation data, modify as per your data structure
  const reservations = [
    { id: 1, customerName: "John Doe", tableNumber: 5, status: "confirmed", specialRequest: "Window seat" },
    { id: 2, customerName: "Jane Smith", tableNumber: 3, status: "pending", specialRequest: "Vegetarian meal" },
    { id: 3, customerName: "Alice Brown", tableNumber: 2, status: "canceled", specialRequest: "Celebration cake" },
  ];

  const filteredReservations = reservations.filter((reservation) =>
    filter === "all" ? true : reservation.status === filter
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-blue-950">Reservations</h1>
      
      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      
      {/* Reservations Table */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Customer Name</th>
              <th className="p-3 text-left">Table Number</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Special Requests</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id} className="border-b">
                <td className="p-3">{reservation.customerName}</td>
                <td className="p-3">{reservation.tableNumber}</td>
                <td className={`p-3 ${reservation.status === "confirmed" ? "text-green-600" : reservation.status === "pending" ? "text-yellow-600" : "text-red-600"}`}>
                  {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                </td>
                <td className="p-3">{reservation.specialRequest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;
