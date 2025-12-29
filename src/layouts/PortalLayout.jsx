import { Link, Outlet } from "react-router";
import Header from "../components/Header";
import SingleFooter from "../components/SingleFooter";

export default function PortalLayout() {
  return (
    <div>
      <Header></Header>

      <Outlet></Outlet>

      <SingleFooter></SingleFooter>
    </div>
  );
}
