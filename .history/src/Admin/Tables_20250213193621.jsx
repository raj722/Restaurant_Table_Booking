import React, { useState } from "react";

const Tables = () => {
  const [filter, setFilter] = useState("all");

  // Example table data, modify as per your data structure
  const tables = [
    { id: 1, tableNumber: 1, size: "4", price: "$50", availability: "available" },
    { id: 2, tableNumber: 2, size: "2", price: "$30", availability: "unavailable" },
    { id: 3, tableNumber: 3, size: "6", price: "$70", availability: "available" },
  ];

  const filteredTables = tables.filter((table) =>
    filter === "all" ? true : table.availability === filter
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-blue-950">Tables</h1>
      
      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>
      
      {/* Tables Table */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Table Number</th>
              <th className="p-3 text-left">Size</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Availability</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTables.map((table) => (
              <tr key={table.id} className="border-b">
                <td className="p-3">{table.tableNumber}</td>
                <td className="p-3">{table.size}</td>
                <td className="p-3">{table.price}</td>
                <td className={`p-3 ${table.availability === "available" ? "text-green-600" : "text-red-600"}`}>
                  {table.availability.charAt(0).toUpperCase() + table.availability.slice(1)}
                </td>
                <td className="p-3 space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
