import React from "react";
import { Navigate } from "react-router";

export default function AdminRoute({ children }) {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData?.role === "admin") {
    return children;
  }

  return <Navigate to="/" replace />;
}
