import React, { useState } from 'react';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const RestaurantSignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone_no: '',
    address: '',
    cuisineType: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const cuisineTypes = [
    'Italian',
    'Chinese',
    'Indian',
    'Mexican',
    'Japanese',
    'American',
    'Thai',
    'Mediterranean',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
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
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        restaurantName: formData.restaurantName,
        ownerName: formData.ownerName,
        email: formData.email,
        phone_no: formData.phone_no,
        address: formData.address,
        cuisineType: formData.cuisineType,
        uid: userCredential.user.uid,
        role: 'restaurant',
        status: 'pending', // Restaurant accounts need approval
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      setSuccess('Restaurant account created successfully! Please wait for admin approval.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message.includes('auth/') 
        ? 'Invalid email or password. Please try again.' 
        : 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Register Your Restaurant</h2>
          <p className="mt-2 text-gray-600">Join our platform and reach more customers</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700">
                Restaurant Name
              </label>
              <input
                type="text"
                id="restaurantName"
                value={formData.restaurantName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                Owner Name
              </label>
              <input
                type="text"
                id="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="phone_no" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone_no"
                value={formData.phone_no}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Restaurant Address
              </label>
              <textarea
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="cuisineType" className="block text-sm font-medium text-gray-700">
                Cuisine Type
              </label>
              <select
                id="cuisineType"
                value={formData.cuisineType}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select cuisine type</option>
                {cuisineTypes.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block