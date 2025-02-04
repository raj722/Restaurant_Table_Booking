import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Element } from "react-scroll";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const LandingPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  
  const handleRestaurantClick = (id) => {
    if (isLoggedIn) {
      navigate(`/restaurant/${id}`);
    } else {
      navigate("/signup");
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="relative min-h-screen">
      {/* Welcome Section with Image Grid */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0 grid grid-cols-3 gap-0">
          <div className="bg-[url('/images/party_1.jpg')] bg-cover bg-center h-full" />
          <div className="bg-[url('/images/party_2.png')] bg-cover bg-center h-full" />
          <div className="bg-[url('/images/party_3.jpg')] bg-cover bg-center h-full" />
        </div>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative flex items-center justify-center min-h-screen">
          <div className="px-6 text-center text-white">
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
      </section>

      <div className="h-16 bg-white" />

      {/* Featured Restaurants Section */}
      <Element name="featured-restaurants" id="featured-restaurants">
        <div className="px-4 py-12 mx-auto bg-white max-w-7xl">
          <h2 className="mb-8 text-3xl font-bold text-center md:text-4xl text-blue-950">
            Featured Restaurants
          </h2>
          <Slider {...sliderSettings}>
            {featuredRestaurants.map((restaurant) => (
              <div key={restaurant.id} onClick={() => handleRestaurantClick(restaurant.id)}>
                <div className="overflow-hidden transition-transform duration-300 transform rounded-lg shadow-md cursor-pointer bg-white/90 backdrop-blur-sm hover:scale-105 hover:shadow-lg">
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
              </div>
            ))}
          </Slider>
        </div>
      </Element>
    </div>
  );
};

export default LandingPage;
