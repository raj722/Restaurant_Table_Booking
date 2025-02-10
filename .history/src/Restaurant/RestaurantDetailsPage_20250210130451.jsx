import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Element } from "react-scroll";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const LandingPage = () => {
  const navigate = useNavigate();

  const featuredRestaurants = [
    { id: 1, name: 'Gourmet Palace', location: 'Downtown', image: '/images/gourmet-palace.jpg' },
    { id: 2, name: 'Seafood Delight', location: 'Seaside', image: '/images/seafood-delight.jpg' },
    { id: 3, name: 'Mountain Grill', location: 'Hillside', image: '/images/mountain-grill.jpg' },
  ];

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Welcome to Our Table Booking App</h1>
      
      <h2 className="mb-4 text-2xl font-semibold">Featured Restaurants</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {featuredRestaurants.map((restaurant) => (
          <div 
            key={restaurant.id} 
            className="p-4 border rounded-lg cursor-pointer hover:shadow-lg" 
            onClick={() => handleRestaurantClick(restaurant.id)}
          >
            <img src={restaurant.image} alt={restaurant.name} className="object-cover w-full h-40 rounded-md" />
            <h3 className="mt-2 text-xl font-semibold">{restaurant.name}</h3>
            <p className="text-gray-600">{restaurant.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
