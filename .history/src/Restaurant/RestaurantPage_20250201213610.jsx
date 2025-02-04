import React from "react";
import { Link } from "react-router-dom";

function RestaurantPage() {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Restaurant Dashboard</h1>
      <p>Manage your restaurant tables and bookings in real-time.</p>
      
      <Link 
        to="/restaurant/update-table" 
        className="inline-block px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Update Tables
      </Link>
    </div>
  );
}

export default RestaurantPage;
