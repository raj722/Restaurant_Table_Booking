import React from "react";

function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-md p-6 text-center bg-white shadow-lg rounded-2xl">
        {/* Profile Image */}
        <img 
          src="/images/profile-placeholder.png" 
          alt="Profile" 
          className="w-24 h-24 mx-auto border-4 border-gray-300 rounded-full"
        />

        {/* User Info */}
        <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
        <p className="text-gray-600">johndoe@example.com</p>

        {/* Edit Button */}
        <button className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
