import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({ isAuthenticated, Children }) => {
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
