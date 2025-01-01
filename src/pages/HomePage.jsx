import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container mx-auto mt-6 text-center">
      <h1 className="text-3xl font-bold">Welcome to Restro</h1>
      <p className="mt-4 text-gray-700">Easily find and book your favorite restaurants!</p>
      <Link
        to="/restaurants"
        className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Browse Restaurants
      </Link>
    </div>
  );
}

export default HomePage;
