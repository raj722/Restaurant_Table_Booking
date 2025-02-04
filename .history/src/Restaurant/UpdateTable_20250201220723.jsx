import React, { useState, useEffect } from "react";

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onConfirm, onCancel, tableNumber, newStatus }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Confirm Status Change</h2>
        <p>
          Are you sure you want to change Table {tableNumber} to{" "}
          <span className="font-bold">{newStatus}</span>?
        </p>
        <div className="flex justify-end mt-4 space-x-4">
          <button
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Table Details Modal Component
const TableDetailsModal = ({ table, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Table {table.number} Details</h2>
        <p>Status: <span className="font-bold">{table.status}</span></p>
        {table.customerName && (
          <p>Customer: <span className="font-bold">{table.customerName}</span></p>
        )}
        <button
          className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Table Card Component
const TableCard = ({ table, onUpdateStatus, onDeleteTable, onReserveTable }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    onUpdateStatus(table.id);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleReserveClick = () => {
    onReserveTable(table.id, customerName);
    setCustomerName("");
  };

  const handleDetailsClick = () => {
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Table {table.number}</h2>
      <p>
        Status:{" "}
        <span
          className={`font-bold ${
            table.status === "available" ? "text-green-600" : "text-red-600"
          }`}
        >
          {table.status}
        </span>
      </p>

      <button
        className="px-4 py-2 mt-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        onClick={handleUpdateClick}
        aria-label={`Change status of Table ${table.number}`}
      >
        {table.status === "available" ? "Mark as Booked" : "Mark as Available"}
      </button>

      <button
        className="px-4 py-2 mt-2 text-white bg-red-600 rounded hover:bg-red-700"
        onClick={() => onDeleteTable(table.id)}
        aria-label={`Delete Table ${table.number}`}
      >
        Delete Table
      </button>

      {table.status === "available" && (
        <>
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="p-2 mt-2 border rounded-lg"
          />
          <button
            className="px-4 py-2 mt-2 text-white bg-purple-600 rounded hover:bg-purple-700"
            onClick={handleReserveClick}
          >
            Reserve for Customer
          </button>
        </>
      )}

      <button
        className="px-4 py-2 mt-2 text-white bg-gray-600 rounded hover:bg-gray-700"
        onClick={handleDetailsClick}
      >
        View Details
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        tableNumber={table.number}
        newStatus={table.status === "available" ? "booked" : "available"}
      />

      <TableDetailsModal
        table={table}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </div>
  );
};

// Main Component
function UpdateTable() {
  const [tables, setTables] = useState([
    { id: 1, number: 1, status: "available" },
    { id: 2, number: 2, status: "booked", customerName: "John Doe" },
    { id: 3, number: 3, status: "available" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Real-time updates (polling for updated data every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate fetching updated table data
      // setTables(updatedTables);  // Uncomment to replace with real data fetch logic
      console.log("Fetching updated tables...");
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateTableStatus = (id) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id
          ? { ...table, status: table.status === "available" ? "booked" : "available" }
          : table
      )
    );
  };

  const deleteTable = (id) => {
    setTables((prevTables) => prevTables.filter((table) => table.id !== id));
  };

  const addNewTable = () => {
    const newTable = {
      id: tables.length + 1,
      number: tables.length + 1,
      status: "available",
    };
    setTables([...tables, newTable]);
  };

  const reserveTable = (id, customerName) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id
          ? { ...table, status: "booked", customerName }
          : table
      )
    );
  };

  const printTableList = () => {
    window.print();
  };

  const filteredTables = tables.filter((table) => {
    const matchesSearch = table.number.toString().includes(searchQuery);
    const matchesStatus = filterStatus === "all" || table.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const availableTables = tables.filter((table) => table.status === "available").length;
  const bookedTables = tables.filter((table) => table.status === "booked").length;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Manage Tables</h1>
      <div className="flex flex-col gap-4 mb-4 sm:flex-row">
        <button
          onClick={addNewTable}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Add New Table
        </button>
        <button
          onClick={printTableList}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Print Table List
        </button>
        <input
          type="text"
          placeholder="Search by table number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-lg"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="booked">Booked</option>
        </select>
      </div>
      <div className="mb-4">
        <p>Total Tables: {tables.length}</p>
        <p>Available Tables: {availableTables}</p>
        <p>Booked Tables: {bookedTables}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTables.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            onUpdateStatus={updateTableStatus}
            onDeleteTable={deleteTable}
            onReserveTable={reserveTable}
          />
        ))}
      </div>
    </div>
  );
}

export default UpdateTable;
