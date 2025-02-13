import React, { createContext, useState, useContext } from "react";

// Create the context for authentication
export const AuthContext = createContext();

// Provider component to wrap the app and provide auth context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Stores the logged-in user details
  const [role, setRole] = useState("");  // Stores the role (customer, restaurant, admin)

  // Login function to set user data and role
  const login = (userData, roleData) => {
    setUser(userData);    // Set the user information
    setRole(roleData);    // Set the user role (customer, restaurant, or admin)
    localStorage.setItem("CustomerUser", JSON.stringify(userData));  // Optionally store user data in localStorage
  };

  // Logout function to clear user data and role
  const logout = () => {
    setUser(null);   // Clear user state
    setRole("");     // Clear role state
    localStorage.removeItem("CustomerUser");  // Clear stored user data
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}  {/* Wrap children components with auth context */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context in other components
export const useAuth = () => {
  return useContext(AuthContext);
};
