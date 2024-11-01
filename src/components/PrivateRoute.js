import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated, getCurrentUser } from "../services/auth";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  if (!isAuthenticated()) {
    return <Navigate to='/login' />;
  }

  const user = getCurrentUser();
  if (roles && !roles.includes(user.role)) {
    return <Navigate to='/' />;
  }

  return <Route {...rest} element={<component />} />;
};

export default PrivateRoute;
