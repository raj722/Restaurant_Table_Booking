import React, { useState } from "react";

function UpdateTable() {
  const [tables, setTables] = useState([
    { id: 1, number: 1, status: "available" },
    { id: 2, number: 2, status: "booked" },
    { id: 3, number: 3, status: "available" },
  ]);

  const updateTableStatus = (id) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id
          ? { ...table, status: table.status === "available" ? "booked" : "available" }
          : table
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Manage Tables</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((table) => (
          <div key={table.id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Table {table.number}</h2>
            <p>Status: <span className="font-bold">{table.status}</span></p>
            <button
              className="px-4 py-2 mt-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              onClick={() => updateTableStatus(table.id)}
            >
              {table.status === "available" ? "Mark as Booked" : "Mark as Available"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpdateTable;
