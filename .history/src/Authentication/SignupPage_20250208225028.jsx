import React, { useState } from 'react';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const SignupPage = () => {
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
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validation
    if (!formData.username || !formData.email || !formData.phone_no || !formData.password) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      // Create authentication user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Create user document with roles and permissions
      const userDocRef = doc(db, 'CustomerUser', user.uid);
      await setDoc(userDocRef, {
        username: formData.username,
        email: formData.email,
        phone_no: formData.phone_no,
        uid: user.uid,
        role: {
          type: 'customer',
          permissions: [
            'view_menu',
            'place_order',
            'view_order_history',
            'edit_profile'
          ]
        },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      });

      setSuccess('Account created successfully!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message.includes('auth/') 
        ? 'Invalid email or password format'
        : 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Create Account
          </h2>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="phone_no" className="sr-only">
                Phone Number
              </label>
              <input
                id="phone_no"
                type="tel"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone Number"
                value={formData.phone_no}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-sm text-center">
          <p className="mb-2">
            Are you a restaurant owner?{' '}
            <Link
              to="/restaurant-signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up here
            </Link>
          </p>
          <p>
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;