import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const authLogin = (userDetails) => {
    setUser(userDetails); // Set the logged-in user details
  };

  const authLogout = () => {
    setUser(null); // Clear user state on logout
  };

  return (
    <AuthContext.Provider value={{ user, authLogin, authLogout }}>
      {children}
    </AuthContext.Provider>
  );
};