import React from "react";

const Restaurants = () => {
  // Sample static restaurant data
  const restaurants = [
    { id: 1, name: "Sunset Diner", location: "New York, NY", contact: "123-456-7890" },
    { id: 2, name: "Ocean Breeze Cafe", location: "Los Angeles, CA", contact: "987-654-3210" },
    { id: 3, name: "Mountain View Bistro", location: "Denver, CO", contact: "555-789-1234" },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-blue-950">Restaurants</h1>
      
      <button className="px-4 py-2 mb-4 text-white bg-blue-600 rounded hover:bg-blue-700">
        Add Restaurant
      </button>
      
      <div className="p-6 bg-white rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Contact Info</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant.id} className="border-b">
                <td className="p-3">{restaurant.name}</td>
                <td className="p-3">{restaurant.location}</td>
                <td className="p-3">{restaurant.contact}</td>
                <td className="p-3">
                  <button className="mr-2 text-blue-500 hover:text-blue-700">Edit</button>
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Restaurants;