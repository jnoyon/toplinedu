import React from "react";
import { Navigate } from "react-router";

export default function StudentRoute({ children }) {
  const studentData = JSON.parse(localStorage.getItem("studentData"));

  if (studentData?.role === "student") {
    return children;
  }

  // Redirect to login if not student
  return <Navigate to="/login" replace />;
}
