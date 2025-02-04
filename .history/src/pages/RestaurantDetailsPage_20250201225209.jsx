import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Clock, Phone, Users, MapPin, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reservationData, setReservationData] = useState({
    date: "",
    time: "",
    guests: 1,
    specialRequests: ""
  });
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
    name: ""
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Sample restaurant data
  const restaurants = [
    {
      id: "1",
      name: "Chipsy",
      rating: "Exceptional",
      reviews: [
        {
          id: 1,
          name: "John Doe",
          rating: 5,
          comment: "Amazing food and service!",
          date: "2024-01-15"
        },
        {
          id: 2,
          name: "Jane Smith",
          rating: 4,
          comment: "Great ambiance and delicious food.",
          date: "2024-01-20"
        }
      ],
      reviewCount: "615",
      price: "NRS",
      cuisine: "Tibetan",
      // ... (rest of the restaurant data remains the same)
    },
  ];

  const restaurant = restaurants.find((r) => r.id === id);

  // ... (previous helper functions remain the same)

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add new review to the list (in real app, this would be handled by the backend)
      const newReview = {
        id: restaurant.reviews.length + 1,
        ...reviewData,
        date: new Date().toISOString().split('T')[0]
      };

      restaurant.reviews.unshift(newReview);

      setNotification({
        type: "success",
        message: "Thank you for your review!"
      });

      // Reset form
      setReviewData({
        rating: 5,
        comment: "",
        name: ""
      });
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to submit review. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating, interactive = false) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        } ${interactive ? "cursor-pointer" : ""}`}
        onClick={interactive ? () => setReviewData(prev => ({ ...prev, rating: index + 1 })) : undefined}
      />
    ));
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 md:p-6">
      {/* ... (previous JSX until the main content grid remains the same) */}
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-8">
          {/* ... (previous left column content remains the same) */}
          
          {/* Reviews Section */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Reviews</h2>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{restaurant.rating}</span>
                <span className="text-gray-500">({restaurant.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Review Form */}
            <form onSubmit={handleReviewSubmit} className="p-4 mb-6 border rounded-lg">
              <h3 className="mb-4 text-lg font-semibold">Write a Review</h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-gray-700">Your Name</label>
                  <input
                    type="text"
                    value={reviewData.name}
                    onChange={(e) => setReviewData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700">Rating</label>
                  <div className="flex space-x-1">
                    {renderStars(reviewData.rating, true)}
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-gray-700">Your Review</label>
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows="3"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>

            {/* Reviews List */}
            <div className="space-y-4">
              {restaurant.reviews.map((review) => (
                <div key={review.id} className="p-4 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-600 rounded-full">
                        {review.name.charAt(0)}
                      </div>
                      <span className="font-medium">{review.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* ... (rest of the right column content remains the same) */}
        </div>
      </div>

      {/* ... (image modal remains the same) */}
    </div>
  );
};

export default RestaurantDetailsPage;