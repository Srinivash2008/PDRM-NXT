import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  // If user is logged in, redirect them away from /signin or /register
  if (isLoggedIn) {
      return <Navigate to="/" replace />;
  } 

  return children;
};

export default AuthGuard;