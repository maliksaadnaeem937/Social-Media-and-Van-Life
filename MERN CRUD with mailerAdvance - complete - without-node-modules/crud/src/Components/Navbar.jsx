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
    <nav className="navbar  navbar-expand-lg  bg-dark px-2 px-sm-0 navbar-fixed ">
      <div className="nav-content d-sm-flex  justify-content-between  w-100">
        <NavLink to={"home"} className={`text-decoration-none text-white`}>
          <h2>Logo</h2>
        </NavLink>

        <div className="nav-items d-flex gap-5 align-items-center ">
          <NavLink
            to={"home"}
            className={`text-decoration-none text-white`}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Home
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            to={`create-post`}
            className={`text-decoration-none text-white`}
          >
            Create Post
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            to={`my-posts`}
            className={`text-decoration-none text-white`}
          >
            My Posts
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            to={`my-profile`}
            className={`text-decoration-none text-white`}
          >
           Profile
          </NavLink>
          <button className="btn btn-primary" onClick={logoutFunction}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
