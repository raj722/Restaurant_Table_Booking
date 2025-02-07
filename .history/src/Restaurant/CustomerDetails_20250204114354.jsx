import React from "react";
import { useParams, Link } from "react-router-dom";

function CustomerDetails() {
  const { customerId } = useParams();

  const customers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+977 9801234567",
      bookings: [
        {
          id: 1,
          date: "2025-02-10",
          time: "7:30 PM",
          table: "Table 5",
          guests: 2,
        },
      ],
    },
    {
      id: 2,
      name: "Michael Smith",
      email: "michael@example.com",
      phone: "+977 9812345678",
      bookings: [
        {
          id: 1,
          date: "2025-02-12",
          time: "8:00 PM",
          table: "Table 8",
          guests: 4,
        },
      ],
    },
  ];

  const customer = customers.find((cust) => cust.id === parseInt(customerId));

  if (!customer) {
    return (
      <div className="text-center text-red-600">
        <p>Customer not found!</p>
        <Link to="/restaurant/bookings-management" className="text-blue-600">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Link to="/restaurant/bookings-management" className="text-blue-600">← Back to Bookings</Link>
      <h1 className="text-xl font-bold">Customer Details</h1>
      <h2 className="mt-4 text-lg">{customer.name}</h2>
      <p>{customer.email}</p>
      <p>{customer.phone}</p>

      <h3 className="mt-4 text-lg font-semibold">Booking History ({customer.bookings.length} total)</h3>
      {customer.bookings.length === 0 ? (
        <p className="text-gray-600">No bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {customer.bookings.map((booking) => (
            <div key={booking.id} className="p-4 bg-white rounded-lg shadow-md">
              <p>{booking.date} at {booking.time}</p>
              <p>{booking.table} | {booking.guests} guests</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerDetails;