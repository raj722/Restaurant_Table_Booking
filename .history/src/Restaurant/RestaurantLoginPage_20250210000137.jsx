import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const RestaurantLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Firebase authentication login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user details from Firestore collection "RestaurantUser"
      const userDoc = await getDoc(doc(db, "RestaurantUser", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem("RestaurantUser", JSON.stringify(userData));

        // Redirect restaurant user to the dashboard
        navigate("/restaurant-dashboard");
      } else {
        setError("Access Denied: Not a registered restaurant user.");
      }

      alert("Login successful!");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: "url('/images/background.png')" }}>

      <div className="w-full max-w-md p-8 bg-gray-300 rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Restaurant Sign In</h2>

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 text-white rounded-lg ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center justify-between mt-4">
          <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account? 
            <Link to="/signup" className="ml-1 text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLoginPage;
