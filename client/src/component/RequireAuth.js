import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Unauthorized from "./Unauthorized";

const RequireAuth = ({ allowedRole }) => {
//   const { auth } = useAuth();
//   const location = useLocation();
  const role = localStorage.getItem("role");
  const roles = [role]
  return roles.find((role) => allowedRole?.includes(role)) ? (
    <Outlet />
  ) : (
    <Unauthorized />
  );
};

export default RequireAuth;
