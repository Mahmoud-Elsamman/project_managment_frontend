import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated, getCurrentUser } from "../services/authService";

const PrivateRoute = ({ children, roles }) => {
  if (!isAuthenticated()) {
    return <Navigate to='/login' />;
  }

  const user = getCurrentUser();
  if (roles && !roles.includes(user.role)) {
    return <Navigate to='/' />;
  }

  return children;
};

export default PrivateRoute;
