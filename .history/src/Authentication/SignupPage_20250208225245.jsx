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

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, 'CustomerUser', user.uid), {
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
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen py-6 bg-white sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 mx-8 bg-white shadow md:mx-0 rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <h1 className="text-2xl font-semibold text-gray-900">Create Account</h1>
            </div>

            {error && (
              <div className="mt-2 text-sm text-red-500">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-2 text-sm text-green-500">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="divide-y divide-gray-200">
                <div className="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">Username</label>
                    <input
                      type="text"
                      id="username"
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Phone Number</label>
                    <input
                      type="tel"
                      id="phone_no"
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                      value={formData.phone_no}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex items-center pt-4 space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                  </button>
                </div>
              </div>
            </form>

            <div className="pt-4 text-sm text-center text-gray-500">
              <p className="mb-2">
                Are you a restaurant owner?{' '}
                <Link to="/restaurant-signup" className="text-blue-600 hover:text-blue-500">
                  Sign up here
                </Link>
              </p>
              <p>
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-500">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;