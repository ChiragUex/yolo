import React from "react";
import { Navigate } from "react-router";
import DrawerIndex from "../pages/DrawerIndex";

const PrivateRoute = ({ isLayout, children }) => {

  return localStorage.getItem("authUser") &&
    localStorage.getItem("authAwsCred") &&
    localStorage.getItem("authCognitoId") ? (
    // <>{isLayout ? <DrawerIndex>{children}</DrawerIndex> : children}</>
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
