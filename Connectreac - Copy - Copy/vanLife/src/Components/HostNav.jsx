import { Outlet, NavLink } from "react-router-dom";

export default function HostNav() {
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
            <ul className="d-flex ps-0 justify-content-between align-items-start gap-3 gap-md-0 w-50">
              <li>
                <NavLink
                end
                  to="."

                  style={({ isActive }) => isActive ? activeStyle : undefined}
                  className={`text-decoration-none`}
           
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="income"
                  style={({ isActive }) => isActive ? activeStyle : undefined}
                  className={`text-decoration-none`}

                >
                  Income
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="vans"
                  style={({ isActive }) => isActive ? activeStyle : undefined}
                  className={`text-decoration-none`}
  
                >
                  Vans
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="reviews"
            
                  style={({ isActive }) => isActive ? activeStyle : undefined}
                  className={`text-decoration-none`}
                >
                  Reviews
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
