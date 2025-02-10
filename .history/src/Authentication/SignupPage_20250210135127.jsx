import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Implement your API call for signup here
      const response = await fetch("YOUR_BACKEND_API/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, phoneNo }),
      });
      
      if (!response.ok) {
        throw new Error("Signup failed. Please try again.");
      }

      navigate("/login"); // Redirect to login page after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-96">
        <h2 className="mb-4 text-2xl font-bold text-center">Sign Up</h2>
        {error && <p className="text-center text-red-500">{error}</p>}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;