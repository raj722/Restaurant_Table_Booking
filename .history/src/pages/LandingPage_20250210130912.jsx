import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Element } from "react-scroll";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const navigate = useNavigate();
  const sliderRef = React.useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
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
          <div className="relative">
            <button
              onClick={previous}
              className="absolute left-0 z-10 p-2 transform -translate-y-1/2 bg-white rounded-full shadow-lg top-1/2 hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6 text-blue-950" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 z-10 p-2 transform -translate-y-1/2 bg-white rounded-full shadow-lg top-1/2 hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6 text-blue-950" />
            </button>
            <div className="px-8">
              <Slider ref={sliderRef} {...sliderSettings}>
                {featuredRestaurants.map((restaurant) => (
                  <div key={restaurant.id} className="px-2">
                    <div
                      onClick={() => handleRestaurantClick(restaurant.id)}
                      className="overflow-hidden transition-transform duration-300 transform rounded-lg shadow-md cursor-pointer bg-white/90 backdrop-blur-sm hover:scale-105 hover:shadow-lg"
                    >
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
          </div>
        </div>
      </Element>

      {/* About Us Section */}
      <section id="about-us" className="py-16 bg-gray-300">
        <h2 className="mb-8 text-3xl font-semibold text-center">About Us</h2>
        <div className="container px-6 mx-auto">
          <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex justify-center md:col-span-1">
              <Link to="/about">
                <img
                  src="/images/logo.png"
                  alt="About Us"
                  className="object-cover w-40 h-40 transition-transform rounded-lg shadow-lg md:w-48 md:h-48 hover:scale-105"
                />
              </Link>
            </div>
            <div className="text-center md:col-span-2 md:text-left">
              <p className="text-lg leading-relaxed text-gray-900">
                We are passionate about bringing people together through the love of food.
                Our goal is to provide the easiest and most enjoyable restaurant booking experience.
                Whether you're looking for a casual meal or a fine dining experience, we've got you covered.
                Our platform allows you to discover, explore, and book the best restaurants near you effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;