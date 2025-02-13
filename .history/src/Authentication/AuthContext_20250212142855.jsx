import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("access_token");
    if (storedRole && storedToken) {
      setRole(storedRole);
      setAccessToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ role, setRole, accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
