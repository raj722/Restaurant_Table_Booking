import React from "react";

function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              placeholder="username@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
        <div className="flex justify-between items-center mt-4">
          <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
        <div className="mt-6">
          <button className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mb-2">
            Sign in with Google
          </button>
          <button className="w-full py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
