import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function NavBar() {
  const navigate = useNavigate();

  const logoutFunction = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const activeStyle = {
    fontWeight: "bold",
  };

  return (
    <nav className="bg-gray-900 p-4 fixed w-full top-0 z-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <NavLink to={"home"} className="text-white text-2xl font-bold">
          Logo
        </NavLink>

        {/* Navigation Items */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink
            to={"home"}
            className="text-white hover:text-gray-300 transition"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Home
          </NavLink>
          <NavLink
            to={"create-post"}
            className="text-white hover:text-gray-300 transition"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Create Post
          </NavLink>
          <NavLink
            to={"my-posts"}
            className="text-white hover:text-gray-300 transition"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            My Posts
          </NavLink>
          <NavLink
            to={"my-profile"}
            className="text-white hover:text-gray-300 transition"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Profile
          </NavLink>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
            onClick={logoutFunction}
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            {/* Replace with an actual icon like a hamburger menu */}☰
          </button>
        </div>
      </div>
    </nav>
  );
}
