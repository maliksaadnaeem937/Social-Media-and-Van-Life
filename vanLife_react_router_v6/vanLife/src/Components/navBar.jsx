import { Outlet, NavLink } from "react-router-dom";

function NavBar() {
  const activeStyle = {
    color: "red",
    textDecoration: "underline",
    fontWeight: "bold",
    
  };

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <nav className="navbar pt-3">
            <NavLink
            end
              to="/"                   
              className="text-decoration-none"
            >
           <h2>VanLife</h2>
            </NavLink>

            <ul className="ms-auto d-flex gap-5">
              <li>
                <NavLink
                  to="/about"
                  style={({ isActive }) => isActive ? activeStyle : undefined}
                  className="text-decoration-none"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/vans"
                  style={({ isActive }) => isActive ? activeStyle : undefined}
                  className="text-decoration-none"
                >
                  Vans
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/host"
                  style={({ isActive }) => isActive ? activeStyle : undefined}
                  className="text-decoration-none"
                >
                  Host
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default NavBar;
