import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("access_token");

    if (storedRole && storedToken) {
      setRole(storedRole);
      setAccessToken(storedToken);
    }
  }, []);

  const login = (userRole, token) => {
    setRole(userRole);
    setAccessToken(token);

    // Store in localStorage for persistence
    localStorage.setItem("role", userRole);
    localStorage.setItem("access_token", token);
  };

  const logout = () => {
    setRole(null);
    setAccessToken(null);

    // Remove from localStorage
    localStorage.removeItem("role");
    localStorage.removeItem("access_token");

    // Redirect based on role after logout
    if (role === "restaurant") {
      navigate("/restaurant"); // Redirect to restaurant page
    } else {
      navigate("/login"); // Redirect to login page for customers
    }
  };

  return (
    <AuthContext.Provider value={{ role, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);