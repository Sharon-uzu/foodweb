import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('userData');

  // If no user is stored, redirect to sign in
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // If user exists, render the children
  return children;
};

export default ProtectedRoute;
