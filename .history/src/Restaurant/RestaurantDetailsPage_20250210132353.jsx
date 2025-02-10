import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Clock, Phone, MapPin } from "lucide-react";

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

  // Updated restaurants data to match Landing Page
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
    },
    {
      id: "2",
      name: "Hyatt",
      rating: "Awesome",
      reviews: "1595",
      price: "NRS",
      cuisine: "Nepali",
      location: "Boudha",
      description: "Luxurious dining experience with authentic Nepali flavors.",
      mainImage: "/images/hyatt.png",
      photos: {
        interior: ["/images/hyatt-interior1.jpg", "/images/hyatt-interior2.jpg"],
        food: ["/images/hyatt-food1.jpg", "/images/hyatt-food2.jpg"],
        ambiance: ["/images/hyatt-ambiance1.jpg"],
      },
      openingHours: {
        weekdays: "11:00 AM - 11:00 PM",
        weekends: "11:00 AM - 12:00 AM"
      },
      contact: {
        phone: "+977 9876543210",
        email: "dining@hyatt.com",
        address: "45 Boudha Road, Kathmandu"
      },
      features: ["Fine Dining", "Valet Parking", "Private Dining Rooms"],
      menu: {
        popular: [
          { name: "Dal Bhat", price: "450" },
          { name: "Sekuwa", price: "550" }
        ]
      }
    },
    {
      id: "3",
      name: "Everest Dine",
      rating: "Excellent",
      reviews: "1203",
      price: "NRS",
      cuisine: "Nepali",
      location: "Thamel",
      description: "Traditional Nepali dining with a modern twist.",
      mainImage: "/images/Everest_dine.png",
      photos: {
        interior: ["/images/everest-interior1.jpg", "/images/everest-interior2.jpg"],
        food: ["/images/everest-food1.jpg", "/images/everest-food2.jpg"],
        ambiance: ["/images/everest-ambiance1.jpg"],
      },
      openingHours: {
        weekdays: "10:00 AM - 10:00 PM",
        weekends: "10:00 AM - 11:00 PM"
      },
      contact: {
        phone: "+977 1122334455",
        email: "info@everestdine.com",
        address: "78 Thamel Marg, Kathmandu"
      },
      features: ["Live Music", "Rooftop Seating", "Bar"],
      menu: {
        popular: [
          { name: "Newari Khaja Set", price: "400" },
          { name: "Buff Choila", price: "350" }
        ]
      }
    },
    {
      id: "4",
      name: "Durbar Palace",
      rating: "Great",
      reviews: "870",
      price: "NRS",
      cuisine: "Fusion",
      location: "Lazimpat",
      description: "Royal dining experience with fusion cuisine.",
      mainImage: "/images/durbar_palace.png",
      photos: {
        interior: ["/images/durbar-interior1.jpg", "/images/durbar-interior2.jpg"],
        food: ["/images/durbar-food1.jpg", "/images/durbar-food2.jpg"],
        ambiance: ["/images/durbar-ambiance1.jpg"],
      },
      openingHours: {
        weekdays: "12:00 PM - 10:00 PM",
        weekends: "12:00 PM - 11:00 PM"
      },
      contact: {
        phone: "+977 9988776655",
        email: "info@durbarpalace.com",
        address: "34 Lazimpat Road, Kathmandu"
      },
      features: ["Royal Ambiance", "Garden Seating", "Private Events"],
      menu: {
        popular: [
          { name: "Royal Thali", price: "600" },
          { name: "Fusion Platter", price: "750" }
        ]
      }
    }
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
      // Simulated API call
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

  // Rest of the component remains the same...

  return (
    <div className="min-h-screen p-4 bg-gray-100 md:p-6">
      {/* Component JSX remains the same... */}
    </div>
  );
};

export default RestaurantDetailsPage;