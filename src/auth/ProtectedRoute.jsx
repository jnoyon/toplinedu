import React from "react";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData?.role === "teacher" || userData?.role === "admin") {
    return children;
  }

  return <Navigate to="/" replace />;
}
