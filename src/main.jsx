import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";

// Visitor
import VisitorLayout from "./layouts/VisitorLayout.jsx";
import Home from "./pages/visitor/Home.jsx";
import About from "./pages/visitor/About.jsx";
import AdmissionForm from "./pages/visitor/AdmissionForm.jsx";
import Login from "./pages/portal/Login.jsx";

// Student Portal
import PortalLayout from "./layouts/PortalLayout.jsx";
import PortalHome from "./pages/portal/PortalHome.jsx";
import Profile from "./pages/portal/Profile.jsx";
import StudentRoute from "./auth/StudentRoute.jsx";

// Teacher/Admin Dashboard
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import DashboardHome from "./layouts/DashboardHome.jsx";
import AddAttendance from "./dashboard/AddAttendance.jsx";
import ExamResultsInput from "./dashboard/ExamResultsInput.jsx";
import AddTeacher from "./dashboard/AddTeacher.jsx";
import Teachers from "./dashboard/Teachers.jsx";
import NoticeBoard from "./dashboard/NoticeBoard.jsx";
import Students from "./dashboard/Students.jsx";
import StudentProfile from "./dashboard/StudentProfile.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import AdminRoute from "./auth/AdminRoute.jsx";
import Results from "./pages/portal/Results.jsx";
import Guideline from "./pages/portal/Guideline.jsx";
import Routine from "./pages/portal/Routine.jsx";
import EditStudent from "./pages/portal/EditStudent.jsx";
import EditProfile from "./dashboard/EditProfile.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Visitor routes */}
        <Route element={<VisitorLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Student Portal */}
        <Route
          element={
            <StudentRoute>
              <PortalLayout />
            </StudentRoute>
          }
        >
          <Route path="/portal" element={<PortalHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="edit-student" element={<EditStudent />} />
          <Route path="results" element={<Results />} />
          <Route path="guideline" element={<Guideline />} />
          <Route path="routine" element={<Routine />} />
        </Route>

        {/* Teacher/Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="attendance" element={<AddAttendance />} />
          <Route path="exams" element={<ExamResultsInput />} />
          <Route path="students" element={<Students />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="admission" element={<AdmissionForm />} />
          <Route path="student-profile/:id" element={<StudentProfile />} />

          {/* Admin only */}
          <Route
            path="notices"
            element={
              <AdminRoute>
                <NoticeBoard />
              </AdminRoute>
            }
          />
          <Route
            path="add-teacher"
            element={
              <AdminRoute>
                <AddTeacher />
              </AdminRoute>
            }
          />
          <Route
            path="teacher-list"
            element={
              <AdminRoute>
                <Teachers />
              </AdminRoute>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
