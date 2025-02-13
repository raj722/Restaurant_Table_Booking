import React, { useState } from "react";

const Customers = () => {
  const [filter, setFilter] = useState("all");

  const customers = [
    { id: 1, name: "Raj Tamang", email: "raj@example.com", bookings: 5, status: "active" },
    { id: 2, name: "Sumitr Pakhrin", email: "sunmitra@example.com", bookings: 3, status: "inactive" },
    { id: 3, name: "Chandra Koirala", email: "chandra@example.com", bookings: 8, status: "active" },
  ];

  const filteredCustomers = customers.filter((customer) =>
    filter === "all" ? true : customer.status === filter
  );

  return (
    <div className="min-h-screen p-6 ml-64 bg-gray-100"> {/* Added ml-64 for spacing */}
      <h1 className="mb-6 text-3xl font-bold text-blue-950">Customers</h1>
      
      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      
      {/* Customers Table */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Total Bookings</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="border-b">
                <td className="p-3">{customer.name}</td>
                <td className="p-3">{customer.email}</td>
                <td className="p-3">{customer.bookings}</td>
                <td className={`p-3 ${customer.status === "active" ? "text-green-600" : "text-red-600"}`}>
                  {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
