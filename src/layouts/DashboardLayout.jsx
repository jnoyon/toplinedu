import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import SingleFooter from "../components/SingleFooter";

export default function DashboardLayout() {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <SingleFooter></SingleFooter>
    </div>
  );
}
