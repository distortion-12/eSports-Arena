import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, children }) => {
  // If there is no user object, it means they are not logged in.
  // Redirect them to the /auth page.
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If there is a user, show the component (e.g., the DashboardPage).
  return children;
};

export default PrivateRoute;