import "../App.css";
import NavBar from "./navBar";

import { Outlet } from "react-router-dom";

export default function ProtectedNav() {

  return (
    <>
      <NavBar></NavBar>
      <div className="container-fluid px-0 bg-dark">
        <Outlet></Outlet>
      </div>
    </>
  );
}
