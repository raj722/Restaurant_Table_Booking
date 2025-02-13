import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Load authentication details from localStorage
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("access_token");

    if (storedUser && storedRole && storedToken) {
      try {
        setUser(JSON.parse(storedUser));  // Only parse if it's not null or undefined
        setRole(storedRole);
        setAccessToken(storedToken);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const login = (userData, userRole, token) => {
    setUser(userData);
    setRole(userRole);
    setAccessToken(token);

    // Store in localStorage for persistence
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userRole);
    localStorage.setItem("access_token", token);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setAccessToken(null);

    // Remove from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider value={{ user, role, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
