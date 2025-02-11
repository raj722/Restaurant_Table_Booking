import React, { useState } from "react";

const TimeSlots = () => {
  const [filter, setFilter] = useState("all");

  // Example time slots data, modify as per your data structure
  const timeSlots = [
    { id: 1, time: "12:00 PM", peak: false },
    { id: 2, time: "6:00 PM", peak: true },
    { id: 3, time: "8:00 PM", peak: true },
    { id: 4, time: "2:00 PM", peak: false },
  ];

  const filteredTimeSlots = timeSlots.filter((slot) =>
    filter === "all" ? true : slot.peak === (filter === "peak")
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-blue-950">Time Slots</h1>
      
      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="peak">Peak Hours</option>
          <option value="non-peak">Non-Peak Hours</option>
        </select>
      </div>
      
      {/* Time Slots Table */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTimeSlots.map((slot) => (
              <tr key={slot.id} className="border-b">
                <td className="p-3">{slot.time}</td>
                <td className={`p-3 ${slot.peak ? "text-red-600" : "text-green-600"}`}>
                  {slot.peak ? "Peak" : "Non-Peak"}
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

      {/* Add new slot button */}
      <div className="mt-4">
        <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Add New Time Slot
        </button>
      </div>
    </div>
  );
};

export default TimeSlots;
