import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, Clock, Phone, Users, Calendar, MapPin, ChevronLeft, ChevronRight, UserCircle, LogOut, Settings } from "lucide-react";

const RestaurantDetailsPage = () => {
  // Navbar state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Restaurant details state
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

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("userToken");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Restaurant data remains the same
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
      }
    }
  ];

  const restaurant = restaurants.find((r) => r.id === id);

  // All the handler functions remain the same
  const handleImageNavigation = (direction) => {
    const allPhotos = [
      ...restaurant.photos.interior,
      ...restaurant.photos.food,
      ...restaurant.photos.ambiance
    ];
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

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 text-red-600 bg-red-100 rounded-lg">
          Restaurant not found. Please try again or contact support.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 text-white bg-gray-800">
        <div className="flex items-center">
          <Link to="/">
            <img src="/images/logo.png" alt="Logo" className="object-contain w-12 h-12 mr-4" />
          </Link>
        </div>

        <ul className="flex justify-center flex-grow space-x-6 text-center">
          <li><Link to="/booking" className="hover:text-gray-300">Booking Table</Link></li>
          <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
          <li><Link to="/restaurant" className="hover:text-gray-300">Restaurant</Link></li>
          <li><Link to="/restaurant-details" className="hover:text-gray-300">Restaurant Details</Link></li>
          <li><Link to="/admin" className="hover:text-gray-300">Admin</Link></li>
        </ul>

        <div className="flex items-center space-x-4">
          <Link to="/login" className="hover:text-gray-300">Login</Link>
          <Link to="/signup" className="hover:text-gray-300">Signup</Link>

          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
              <UserCircle className="w-8 h-8 hover:text-gray-300" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 w-48 mt-2 bg-white rounded-lg shadow-lg">
                <Link to="/profile" className="flex items-center p-3 text-gray-800 hover:bg-gray-100">
                  <UserCircle className="w-5 h-5 mr-2" /> Profile
                </Link>
                <button className="flex items-center w-full p-3 text-left text-gray-800 hover:bg-gray-100">
                  <Settings className="w-5 h-5 mr-2" /> Settings
                </button>
                <button className="flex items-center w-full p-3 text-left text-red-600 hover:bg-gray-100">
                  <LogOut className="w-5 h-5 mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Rest of the RestaurantDetailsPage component remains the same */}
      <div className="p-4 md:p-6">
        {/* Original RestaurantDetailsPage content */}
        <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-md max-w-7xl">
          {/* Hero Section */}
          <div className="relative h-96">
            <img
              src={restaurant.mainImage}
              alt={restaurant.name}
              className="object-cover w-full h-full"
            />
            {/* Rest of the component content... */}
          </div>
          {/* Main content sections remain the same */}
        </div>
      </div>

      {/* Image Modal remains the same */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setSelectedImage(null)}
        >
          {/* Modal content remains the same */}
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailsPage;