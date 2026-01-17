import { Navigate } from "react-router";

export default function StudentRoute({ children }) {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData?.role === "student") {
    return children;
  }

  return <Navigate to="/login" replace />;
}
