import "../App.css";
import NavBar from "./navBar";

import { Outlet } from "react-router-dom";

export default function ProtectedNav() {

  return (
    <>
      <NavBar></NavBar>
      <div className="w-[100%] px-0 bg-gray-900">
        <Outlet></Outlet>
      </div>
    </>
  );
}
