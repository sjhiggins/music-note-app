import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingLogStatus, setIsCheckingLogStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsCheckingLogStatus(false);
    });
  }, []);

  const AuthContextObj = {
    isLoggedIn,
    isCheckingLogStatus,
  };
  console.log(["logged in? ", isLoggedIn]);
  console.log(["checkingStatus ", isCheckingLogStatus]);

  return (
    <AuthContext.Provider value={AuthContextObj}>
      {children}
    </AuthContext.Provider>
  );
};
