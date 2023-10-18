import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRole }) => {
  //   const { auth } = useAuth();
  //   const location = useLocation();
  const role = localStorage.getItem("role");
  const roles = [role];
  return roles?.find((role) => allowedRole?.includes(role)) ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
};

export default RequireAuth;
