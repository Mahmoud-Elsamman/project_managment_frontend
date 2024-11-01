import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated, getCurrentUser } from "../services/auth";

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!isAuthenticated()) return <Redirect to='/login' />;

      const user = getCurrentUser();
      if (roles && roles.indexOf(user.role) === -1) {
        return <Redirect to='/' />;
      }

      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
