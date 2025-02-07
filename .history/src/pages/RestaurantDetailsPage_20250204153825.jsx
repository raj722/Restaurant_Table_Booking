import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Clock, Phone, Users, Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import RestaurantMap from './RestaurantMap';

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reservationData, setReservationData] = useState({
    date: "",
    time: "",
    guests: 1,
    specialRequests: ""
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const isLoggedIn = localStorage.getItem("userToken");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const restaurants = [
    {
      id: "1",
      name: "Chipsy",
      rating: "Exceptional",
      reviews: "615",
      price: "NRS",
      cuisine: "Tibetan",
      location: "Old-Baneshwor",
      description: "Experience authentic Tibetan cuisine in the heart of Old-Baneshwor.",
      mainImage: "/images/chipsy.png",
      photos: {
        interior: ["/images/chipsy-interior1.jpg", "/images/chipsy-interior2.jpg"],
        food: ["/images/chipsy-food1.jpg", "/images/chipsy-food2.jpg"],
        ambiance: ["/images/chipsy-ambiance1.jpg"],
      },
      openingHours: {
        weekdays: "10:00 AM - 10:00 PM",
        weekends: "11:00 AM - 11:00 PM"
      },
      contact: {
        phone: "+977 1234567890",
        email: "info@chipsy.com",
        address: "123 Old-Baneshwor, Kathmandu"
      },
      features: ["Outdoor Seating", "Wheelchair Accessible", "Parking Available"],
      menu: {
        popular: [
          { name: "Momos", price: "250" },
          { name: "Thukpa", price: "300" }
        ]
      },
      coordinates: {
        lat: 27.7172,
        lng: 85.3240
      }
    },
  ];

  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 text-red-600 bg-red-100 rounded-lg">
          Restaurant not found. Please try again or contact support.
        </div>
      </div>
    );
  }

  const allPhotos = [
    ...restaurant.photos.interior,
    ...restaurant.photos.food,
    ...restaurant.photos.ambiance
  ];

  const handleImageNavigation = (direction) => {
    const newIndex = direction === 'next'
      ? (currentImageIndex + 1) % allPhotos.length
      : (currentImageIndex - 1 + allPhotos.length) % allPhotos.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(allPhotos[newIndex]);
  };

  const handleReservationChange = (e) => {
    const { name, value } = e.target;
    setReservationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNotification({
        type: "success",
        message: "Reservation submitted successfully! We'll confirm shortly."
      });
      
      setReservationData({
        date: "",
        time: "",
        guests: 1,
        specialRequests: ""
      });
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to submit reservation. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 md:p-6">
      <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-md max-w-7xl">
        {/* Hero Section */}
        <div className="relative h-96">
          <img
            src={restaurant.mainImage}
            alt={restaurant.name}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30">
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                {restaurant.name}
              </h1>
              <div className="flex items-center mt-4 space-x-4 text-white/90">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {restaurant.location}
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  {restaurant.rating} ({restaurant.reviews} reviews)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Description */}
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-2xl font-bold">About</h2>
                <p className="text-gray-700">{restaurant.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <div>
                      <p className="font-semibold">Opening Hours</p>
                      <p className="text-sm text-gray-600">Weekdays: {restaurant.openingHours.weekdays}</p>
                      <p className="text-sm text-gray-600">Weekends: {restaurant.openingHours.weekends}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-gray-500" />
                    <div>
                      <p className="font-semibold">Contact</p>
                      <p className="text-sm text-gray-600">{restaurant.contact.phone}</p>
                      <p className="text-sm text-gray-600">{restaurant.contact.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Map */}
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-2xl font-bold">Location</h2>
                <RestaurantMap 
                  address={restaurant.contact.address}
                  name={restaurant.name}
                  coordinates={restaurant.coordinates}
                />
              </div>

              {/* Photo Gallery */}
              <div>
                <h2 className="mb-6 text-2xl font-bold">Photo Gallery</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {allPhotos.map((photo, index) => (
                    <div 
                      key={index}
                      className="relative overflow-hidden rounded-lg cursor-pointer aspect-square group"
                      onClick={() => {
                        setSelectedImage(photo);
                        setCurrentImageIndex(index);
                      }}
                    >
                      <img
                        src={photo}
                        alt={`Gallery ${index + 1}`}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Popular Items */}
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-2xl font-bold">Popular Items</h2>
                <div className="space-y-4">
                  {restaurant.menu.popular.map((item, index) => (
                    <div key={index} className="flex justify-between p-4 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-600">NRS {item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reservation Form */}
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-6 text-2xl font-bold">Book a Table</h2>
                {notification && (
                  <div className={`p-4 mb-4 rounded-lg ${
                    notification.type === "success" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    {notification.message}
                  </div>
                )}
                <form onSubmit={handleReservationSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 text-gray-700">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={reservationData.date}
                      onChange={handleReservationChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={reservationData.time}
                      onChange={handleReservationChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Number of Guests</label>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-gray-500" />
                      <input
                        type="number"
                        name="guests"
                        min="1"
                        max="20"
                        value={reservationData.guests}
                        onChange={handleReservationChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Special Requests</label>
                    <textarea
                      name="specialRequests"
                      value={reservationData.specialRequests}
                      onChange={handleReservationChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      rows="3"
                      placeholder="Any special requirements?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-3 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
                  >
                    {loading ? "Processing..." : "Book Now"}
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl p-2 mx-4">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-h-[90vh] w-auto object-contain"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleImageNavigation('prev');
              }}
              className="absolute p-2 text-white transition-colors rounded-full bg-black/50 hover:bg-black/70 left-4 top-1/2"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleImageNavigation('next');
              }}
              className="absolute p-2 text-white transition-colors rounded-full bg-black/50 hover:bg-black/70 right-4 top-1/2"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute p-2 text-white transition-colors rounded-full bg-black/50 hover:bg-black/70 -top-4 -right-4"
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