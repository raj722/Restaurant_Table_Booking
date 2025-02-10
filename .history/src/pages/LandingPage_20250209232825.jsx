import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Element } from "react-scroll";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const LandingPage = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const sliderRef = React.useRef(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserRole(userSnap.data().role);
        }
      }
    };
    fetchUserRole();
  }, []);

  const handleRestaurantClick = (id) => {
    if (userRole === "CustomerUser") {
      navigate(`/restaurant/${id}`);
    } else {
      alert("Only customers can view restaurant details!");
    }
  };

  return (
    <div>
      <div className="min-h-screen p-4 bg-gray-100 md:p-6">
      <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-md max-w-7xl">
        
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
                    <label className="block mb-1 text-gray-700">Guests</label>
                    <input
                      type="number"
                      name="guests"
                      min="1"
                      value={reservationData.guests}
                      onChange={handleReservationChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Special Requests</label>
                    <textarea
                      name="specialRequests"
                      value={reservationData.specialRequests}
                      onChange={handleReservationChange}
                      rows="3"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg focus:outline-none hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Book Table"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LandingPage;
