import React from "react";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";

const featuredRestaurants = [
  {
    id: "1",
    name: "Chipsy",
    rating: "Exceptional",
    reviews: "615",
    price: "NRS",
    cuisine: "Tibetan",
    location: "Old-Baneshwor",
    image: "/images/chipsy.png",
  },
  {
    id: "2",
    name: "Hyatt",
    rating: "Awesome",
    reviews: "1595",
    price: "NRS",
    cuisine: "Nepali",
    location: "Boudha",
    image: "/images/hyatt.png",
  },
  {
    id: "3",
    name: "Everest Dine",
    rating: "Excellent",
    reviews: "1203",
    price: "NRS",
    cuisine: "Nepali",
    location: "Thamel",
    image: "/images/Everest_dine.png",
  },
  {
    id: "4",
    name: "Durbar Palace",
    rating: "Great",
    reviews: "870",
    price: "NRS",
    cuisine: "Fusion",
    location: "Lazimpat",
    image: "/images/durbar_palace.png",
  },
];

const LandingPage = () => {
  return (
    <div className="relative">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center text-white">
        {/* Background Image */}
        <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url('/images/hero-bg.jpg')` }} />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative px-6">
          <h1 className="mb-4 text-5xl font-bold">Welcome to TableBooking</h1>
          <p className="mb-6 text-lg">
            Discover, explore, and book the best restaurants near you effortlessly!
          </p>
          <button
            className="px-6 py-3 font-bold text-blue-500 bg-white rounded-lg hover:bg-gray-100"
            onClick={() => document.getElementById("featured-restaurants").scrollIntoView({ behavior: "smooth" })}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Whitespace for Separation */}
      <div className="h-16 bg-white" />

      {/* Featured Restaurants Section */}
      <Element name="featured-restaurants" id="featured-restaurants">
        <div className="px-4 py-12 mx-auto bg-white max-w-7xl">
          <h2 className="mb-8 text-3xl font-bold text-center md:text-4xl text-blue-950">
            Featured Restaurants
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredRestaurants.map((restaurant) => (
              <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id}>
                <div className="overflow-hidden transition-transform duration-300 transform rounded-lg shadow-md bg-white/90 backdrop-blur-sm hover:scale-105 hover:shadow-lg">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="object-cover w-full h-48"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{restaurant.name}</h3>
                    <p className="text-sm text-gray-600">{restaurant.cuisine} • {restaurant.location}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm font-semibold text-red-600">{restaurant.rating}</span>
                      <span className="ml-2 text-sm text-gray-500">({restaurant.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Element>
    </div>
  );
};

export default LandingPage;
