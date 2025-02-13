import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("CustomerUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem("CustomerRole");
    return storedRole || "";
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("CustomerToken") || "";
  });

  const isTokenExpired = (token) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  };

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, [token]);

  const login = (userData, roleData, tokenData) => {
    setUser(userData);
    setRole(roleData);
    setToken(tokenData);
    localStorage.setItem("CustomerUser", JSON.stringify(userData));
    localStorage.setItem("CustomerRole", roleData);
    localStorage.setItem("CustomerToken", tokenData);
  };

  const logout = () => {
    setUser(null);
    setRole("");
    setToken("");
    localStorage.removeItem("CustomerUser");
    localStorage.removeItem("CustomerRole");
    localStorage.removeItem("CustomerToken");
  };

  const isAuthenticated = () => {
    return !!user && !!token;
  };

  return (
    <AuthContext.Provider value={{ user, role, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};