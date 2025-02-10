import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase"; // Import Firebase auth and Firestore
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Role state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch user role from Firestore
        const userRef = doc(db, "CustomerUser", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setRole(userSnap.data().role); // Assume Firestore has a "role" field
        } else {
          setRole("customer"); // Default role
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role }}>
      {children}
    </AuthContext.Provider>
  );
};
