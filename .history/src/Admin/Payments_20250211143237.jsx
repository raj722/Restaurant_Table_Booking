import React, { useState } from "react";

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const payments = [
    { id: 1, customer: "John Doe", restaurant: "Pizza Place", amount: "$50", status: "Successful", date: "2025-02-10" },
    { id: 2, customer: "Jane Smith", restaurant: "Sushi Spot", amount: "$75", status: "Pending", date: "2025-02-09" },
    { id: 3, customer: "Alice Brown", restaurant: "Steak House", amount: "$100", status: "Failed", date: "2025-02-08" },
  ];

  const filteredPayments = payments.filter(
    (payment) =>
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Payments</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by customer or restaurant"
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="w-full overflow-hidden bg-white rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Restaurant</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment) => (
            <tr key={payment.id} className="border-b">
              <td className="p-3">{payment.customer}</td>
              <td className="p-3">{payment.restaurant}</td>
              <td className="p-3">{payment.amount}</td>
              <td className={`p-3 ${payment.status === "Failed" ? "text-red-500" : payment.status === "Pending" ? "text-yellow-500" : "text-green-500"}`}>{payment.status}</td>
              <td className="p-3">{payment.date}</td>
              <td className="p-3">
                {payment.status === "Successful" && <button className="text-blue-500 hover:text-blue-700">Refund</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
