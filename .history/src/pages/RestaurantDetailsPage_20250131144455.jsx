import React, { useState } from "react";
import { useParams } from "react-router-dom";

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample restaurant data (replace with real data from the database later)
  const restaurants = [
    {
      id: "1",
      name: "Chipsy",
      rating: "Exceptional",
      reviews: "615",
      price: "NRS",
      cuisine: "Tibetan",
      location: "Old-Baneshwor",
      mainImage: "/images/chipsy.png",
      photos: {
        interior: ["/images/chipsy-interior1.jpg", "/images/chipsy-interior2.jpg"],
        food: ["/images/chipsy-food1.jpg", "/images/chipsy-food2.jpg"],
        ambiance: ["/images/chipsy-ambiance1.jpg"],
      },
      openingHours: "10:00 AM - 10:00 PM",
      contact: "+977 1234567890",
    },
    {
      id: "2",
      name: "Hyatt",
      rating: "Awesome",
      reviews: "1595",
      price: "NRS",
      cuisine: "Nepali",
      location: "Boudha",
      mainImage: "/images/hyatt.png",
      photos: {
        interior: ["/images/hyatt-interior1.jpg", "/images/hyatt-interior2.jpg"],
        food: ["/images/hyatt-food1.jpg", "/images/hyatt-food2.jpg"],
        ambiance: ["/images/hyatt-ambiance1.jpg"],
      },
      openingHours: "11:00 AM - 11:00 PM",
      contact: "+977 9876543210",
    },
  ];

  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 text-lg text-red-500 bg-red-100 rounded-lg">
          Restaurant not found. Please try again.
        </div>
      </div>
    );
  }

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 md:p-6">
      <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-md max-w-7xl">
        {/* Restaurant Header */}
        <div className="relative h-48 md:h-64 lg:h-80">
          <img
            src={restaurant.mainImage}
            alt={restaurant.name}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {restaurant.name}
              </h1>
              <p className="mt-2 text-white/90">
                {restaurant.cuisine} • {restaurant.location}
              </p>
            </div>
          </div>
        </div>

        {/* Restaurant Details */}
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Column: Photo Galleries */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">Photo Gallery</h2>
              
              {/* Interior Photos */}
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-700">Interior</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {restaurant.photos.interior.map((photo, index) => (
                    <div 
                      key={index}
                      className="relative overflow-hidden rounded-lg cursor-pointer aspect-square group"
                      onClick={() => handleImageClick(photo)}
                    >
                      <img
                        src={photo}
                        alt={`Interior ${index + 1}`}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Food Photos */}
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-700">Food</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {restaurant.photos.food.map((photo, index) => (
                    <div 
                      key={index}
                      className="relative overflow-hidden rounded-lg cursor-pointer aspect-square group"
                      onClick={() => handleImageClick(photo)}
                    >
                      <img
                        src={photo}
                        alt={`Food ${index + 1}`}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Ambiance Photos */}
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-700">Ambiance</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {restaurant.photos.ambiance.map((photo, index) => (
                    <div 
                      key={index}
                      className="relative overflow-hidden rounded-lg cursor-pointer aspect-square group"
                      onClick={() => handleImageClick(photo)}
                    >
                      <img
                        src={photo}
                        alt={`Ambiance ${index + 1}`}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Reviews and Reservation */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
              <div className="space-y-4">
                <div className="p-4 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100">
                  <p className="text-gray-700">"Amazing food and service!"</p>
                  <p className="mt-2 text-sm text-gray-500">- John Doe</p>
                </div>
                <div className="p-4 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100">
                  <p className="text-gray-700">"Great ambiance and delicious food."</p>
                  <p className="mt-2 text-sm text-gray-500">- Jane Smith</p>
                </div>
              </div>

              <div className="p-4 mt-6 space-y-2 rounded-lg bg-gray-50">
                <h2 className="text-xl font-bold">Opening Hours</h2>
                <p className="text-gray-700">{restaurant.openingHours}</p>
                
                <h2 className="pt-4 text-xl font-bold">Contact</h2>
                <p className="text-gray-700">{restaurant.contact}</p>
              </div>

              {/* Reservation Form */}
              <div className="mt-6">
                <h2 className="mb-4 text-2xl font-bold">Book a Table</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block mb-1 text-gray-700">Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Time</label>
                    <input
                      type="time"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Number of Guests</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Book Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl p-2 mx-4">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-h-[90vh] w-auto object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute p-2 text-white bg-black rounded-full -top-4 -right-4"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailsPage;