import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AuthService from '../services/authService';

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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...signupData } = formData;
      
      const response = await AuthService.signup(signupData);
      
      setSuccess('Account created successfully!');
      
      // You can handle the response here (e.g., store user data in context/state)
      if (response.token) {
        // If you're using any state management (Redux, Context), update it here
        // For example: dispatch(setUser(response.user));
      }

      // Redirect to login or dashboard
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of your component remains the same...
  return (
    // Your existing JSX...
  );
};

export default SignupPage;