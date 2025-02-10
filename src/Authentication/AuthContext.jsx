import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  const login = (userData, roleData) => {
    setUser(userData);
    setRole(roleData);
  };

  const logout = () => {
    setUser(null);
    setRole("");
    localStorage.removeItem("CustomerUser"); // Clear stored user data
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
