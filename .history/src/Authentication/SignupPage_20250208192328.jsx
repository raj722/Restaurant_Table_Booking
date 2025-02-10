import React, { useState } from 'react';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_no: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        username: formData.username,
        email: formData.email,
        phone_no: formData.phone_no,
        uid: userCredential.user.uid,
        role: 'customer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      setSuccess('Account created successfully!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message.includes('auth/') 
        ? 'Invalid email or password. Please try again.' 
        : 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100 sm:px-6 lg:px-8">
      <div className="max-w-md p-6 mx-auto bg-white shadow-lg rounded-xl sm:p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Customer Account</h2>
          <p className="mt-2 text-gray-600">Sign up to start ordering from your favorite restaurants</p>
        </div>

        {error && (
          <div className="p-4 mb-4 text-red-700 border-l-4 border-red-500 bg-red-50">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 mb-4 text-green-700 border-l-4 border-green-500 bg-green-50">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
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
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 space-y-4">
          <div className="text-center">
            <span className="text-gray-600">Are you a restaurant owner? </span>
            <Link to="/restaurant-signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up here
            </Link>
          </div>

          <div className="text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;