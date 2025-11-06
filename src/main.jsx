import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import VisitorLayout from "./layouts/VisitorLayout.jsx";
import Home from "./pages/visitor/Home.jsx";
import About from "./pages/visitor/About.jsx";
import AdmissionForm from "./pages/visitor/AdmissionForm.jsx";
import PortalLayout from "./layouts/PortalLayout.jsx";
import Login from "./pages/portal/Login.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<VisitorLayout />}>
          <Route path="/" element={<Home></Home>} />
          <Route path="/about" element={<About></About>} />
          <Route path="/admission" element={<AdmissionForm></AdmissionForm>} />
        </Route>
        <Route element={<PortalLayout />}>
          <Route path="/login" element={<Login></Login>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
