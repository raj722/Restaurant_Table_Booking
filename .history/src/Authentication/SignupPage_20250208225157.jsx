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

    // Basic validation
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

      // Enhanced user document structure
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
    <div>
      <div>
        <h2>Create Account</h2>
        {error && <div>{error}</div>}
        {success && <div>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Phone Number</label>
            <input
              type="tel"
              id="phone_no"
              value={formData.phone_no}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div>
          <p>
            Are you a restaurant owner?{' '}
            <Link to="/restaurant-signup">Sign up here</Link>
          </p>
          <p>
            Already have an account?{' '}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;