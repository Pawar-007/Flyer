import React, { createContext, useState, useEffect, useContext } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component that wraps its children with the context provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePhoto,setProfilePhoto]=useState('');
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      setIsLoggedIn(true); 
    }
    const storedAvatar = localStorage.getItem("avtar");
    if (storedAvatar) {
      setProfilePhoto(storedAvatar);
    }
  }, []);

  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn,profilePhoto,setProfilePhoto}}>
      {children} 
    </AuthContext.Provider>
  );
};
