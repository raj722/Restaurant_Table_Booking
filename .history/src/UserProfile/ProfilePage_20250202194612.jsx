import React, { useState } from "react";

function ProfilePage() {
  // Simulated user data (Later, you can fetch from a database)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, City, Country",
    profilePic: "/images/profile-placeholder.png",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-md p-6 text-center bg-white shadow-lg rounded-2xl">
        {/* Profile Image */}
        <img 
          src={user.profilePic} 
          alt="Profile" 
          className="w-24 h-24 mx-auto border-4 border-gray-300 rounded-full"
        />

        {/* User Info */}
        <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">{user.phone}</p>
        <p className="text-gray-600">{user.address}</p>

        {/* Edit Profile & Logout Buttons */}
        <div className="flex flex-col mt-4 space-y-3">
          <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
          <button className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
