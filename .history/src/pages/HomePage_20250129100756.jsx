import React from 'react';
import { ChevronDown, Utensils, Clock, Calendar, Star } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
            alt="Restaurant interior"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="relative flex flex-col items-center justify-center h-full px-4 text-white">
          <h1 className="mb-6 text-5xl font-bold text-center md:text-6xl">
            Experience Fine Dining
          </h1>
          <p className="mb-8 text-xl text-center md:text-2xl">
            Book your table for an unforgettable culinary journey
          </p>
          <button className="px-8 py-3 text-lg font-semibold text-white transition-colors bg-red-600 rounded-full hover:bg-red-700">
            Reserve Now
          </button>
          
          <div className="absolute flex justify-center w-full bottom-10">
            <ChevronDown className="w-8 h-8 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="mb-16 text-3xl font-bold text-center md:text-4xl">
            Why Choose Us
          </h2>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Utensils className="w-12 h-12 text-red-600" />
              </div>
              <h3 className="mb-4 text-xl font-semibold">Exquisite Cuisine</h3>
              <p className="text-gray-600">
                Savor our chef's carefully crafted dishes made with the finest ingredients
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Clock className="w-12 h-12 text-red-600" />
              </div>
              <h3 className="mb-4 text-xl font-semibold">Quick Booking</h3>
              <p className="text-gray-600">
                Easy and fast table reservations at your convenience
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Calendar className="w-12 h-12 text-red-600" />
              </div>
              <h3 className="mb-4 text-xl font-semibold">Special Events</h3>
              <p className="text-gray-600">
                Perfect venue for your special occasions and celebrations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-16 text-3xl font-bold text-center md:text-4xl">
            What Our Guests Say
          </h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="mb-4 text-gray-600">
                  "An amazing dining experience! The atmosphere was perfect, and the food was exceptional. Will definitely come back!"
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Customer"
                    className="object-cover w-12 h-12 mr-4 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-sm text-gray-500">Regular Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;