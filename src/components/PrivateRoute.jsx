import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ path, element: Element, ...props }) => {
  // const isAuthenticated = useSelector((state) => state?.auth.isAuthenticated);
  const token = localStorage.getItem("token");
  return token || token !== null ? <Outlet /> : <Navigate to="/signin" />;
};
