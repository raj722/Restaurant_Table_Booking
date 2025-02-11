import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RestaurantSignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact_number: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      setSuccess('Restaurant owner account created successfully!');
      setTimeout(() => {
        navigate('/restaurant-login');
      }, 2000);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 bg-center bg-cover"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      <div className="w-full max-w-md p-8 bg-gray-300 rounded-lg shadow-lg backdrop-blur-sm">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Restaurant Owner Registration</h2>

        {error && <p className="mb-4 text-red-600">{error}</p>}
        {success && <p className="mb-4 text-green-600">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-700">Restaurant Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Restaurant Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="restaurant@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Contact Number</label>
            <input
              type="tel"
              id="contact_number"
              value={formData.contact_number}
              onChange={handleInputChange}
              placeholder="Enter Contact Number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Register as Restaurant Owner'}
          </button>
        </form>

        <div className="mt-6 space-y-4 text-center">
          <p className="text-gray-600">
            Want to order food instead?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up as Customer
            </Link>
          </p>

          <p className="text-sm text-gray-600">
            Already have a restaurant account?{' '}
            <Link to="/restaurant-login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSignupPage;