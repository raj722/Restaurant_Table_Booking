import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, Clock, Phone, Users, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [reservationData, setReservationData] = useState({
    date: "",
    time: "",
    guests: 1,
    specialRequests: ""
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Get current date and time
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Format date to YYYY-MM-DD for input min attribute
  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Maximum date for booking (e.g., 30 days in advance)
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 30);

  // Generate time slots based on restaurant hours
  const generateTimeSlots = (selectedDate) => {
    const date = new Date(selectedDate);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    // Restaurant hours (adjust these based on your needs)
    const startHour = isWeekend ? 11 : 10; // 11 AM weekends, 10 AM weekdays
    const endHour = 22; // 10 PM
    const timeSlots = [];
    
    // If booking for today, only show future time slots
    const currentHour = today.getHours();
    const startingHour = date.toDateString() === today.toDateString() 
      ? Math.max(startHour, currentHour + 2) // Allow booking 2 hours from now
      : startHour;

    for (let hour = startingHour; hour < endHour; hour++) {
      for (let minute of ['00', '30']) {
        timeSlots.push(`${hour.toString().padStart(2, '0')}:${minute}`);
      }
    }

    return timeSlots;
  };

  // Update available time slots when date changes
  useEffect(() => {
    if (reservationData.date) {
      const slots = generateTimeSlots(reservationData.date);
      setAvailableTimeSlots(slots);
      
      // Clear selected time if it's not in available slots
      if (reservationData.time && !slots.includes(reservationData.time)) {
        setReservationData(prev => ({ ...prev, time: '' }));
      }
    }
  }, [reservationData.date]);

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
      // Validate reservation time
      const reservationDateTime = new Date(
        `${reservationData.date}T${reservationData.time}`
      );
      const currentTime = new Date();
      
      if (reservationDateTime < currentTime) {
        throw new Error("Cannot book for past date/time");
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNotification({
        type: "success",
        message: "Reservation submitted successfully! We'll confirm shortly."
      });
      
      // Reset form
      setReservationData({
        date: "",
        time: "",
        guests: 1,
        specialRequests: ""
      });
    } catch (error) {
      setNotification({
        type: "error",
        message: error.message || "Failed to submit reservation. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  // Rest of your existing code...

  return (
    <div className="min-h-screen p-4 bg-gray-100 md:p-6">
      {/* Previous code remains the same until the reservation form */}
      
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
              min={formatDateForInput(tomorrow)} // Can't book for today
              max={formatDateForInput(maxDate)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Bookings available up to {maxDate.toLocaleDateString()}
            </p>
          </div>
          
          <div>
            <label className="block mb-1 text-gray-700">Time</label>
            <select
              name="time"
              value={reservationData.time}
              onChange={handleReservationChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={!reservationData.date}
            >
              <option value="">Select a time</option>
              {availableTimeSlots.map((timeSlot) => (
                <option key={timeSlot} value={timeSlot}>
                  {timeSlot}
                </option>
              ))}
            </select>
            {!reservationData.date && (
              <p className="mt-1 text-sm text-gray-500">
                Please select a date first
              </p>
            )}
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
            <p className="mt-1 text-sm text-gray-500">
              Maximum 20 guests per booking
            </p>
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
            disabled={loading || !reservationData.date || !reservationData.time}
            className="w-full px-4 py-3 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Book Now"}
          </button>
        </form>
      </div>

      {/* Rest of your existing code... */}
    </div>
  );
};

export default RestaurantDetailsPage;