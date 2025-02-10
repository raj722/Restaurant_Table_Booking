import React, { useState } from 'react';
import { auth } from "/src/firebase/firebaseConfig"; 
import { createUserWithEmailAndPassword } from "/src/firebase/firebaseConfig";
import { useNavigate } from 'react-router-dom';  // For redirection after signup

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
  
  const navigate = useNavigate(); // For navigation after signup

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
      // Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      const user = userCredential.user;
      
      // Optional: Save the user data to Firestore (phone number, username, etc.)
      // (You can use Firebase Firestore for storing additional information like phone_no, username)
      await setDoc(doc(db, "users", user.uid), {
        username: formData.username,
        email: formData.email,
        phone_no: formData.phone_no,
        userType: "customer", // You can change this dynamically later
        createdAt: new Date(),
      });
      setSuccess('Account created successfully!');
      
      // Redirect to login after successful signup
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message);
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
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Create Account</h2>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter username"
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
              placeholder="username@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone_no"
              value={formData.phone_no}
              onChange={handleInputChange}
              placeholder="Enter phone number"
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
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => window.location.href = '/restaurant-signup'}
            className="w-full py-3 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600"
          >
            Sign up as Restaurant
          </button>
        </div>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
