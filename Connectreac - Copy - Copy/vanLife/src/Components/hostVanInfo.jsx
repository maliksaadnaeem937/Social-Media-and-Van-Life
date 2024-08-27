import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useLoaderData, useParams } from "react-router-dom";

export default function HostVanInfo() {

  // const [loading, setLoading] = useState(false);
  // const params = useParams();
  // const [hostVan, setHostVan] = useState(null);
  // useEffect(() => {
  //   const fetchHostVanById = async () => {
  //     try {
  //       setLoading(true);

  //       const data = await axios.get(
  //         `http://localhost:3000/api/host/getHostVanById/${params.id}`
  //       );
  //       setHostVan(data.data);
  //     } catch (e) {
  //       console.log(e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchHostVanById();
  // }, []);

  
  const hostVan=useLoaderData();

  const activeStyle = {
    color: "red",
    textDecoration: "underline",
    fontWeight: "bold",
  };

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          {hostVan && (
            <div className="row  align-items-center mt-3  gap-2">
              <div className="col-12">
                <NavLink className={`  fw-bold  `} relative="path" to={`..`}>
                  Back to all vans
                </NavLink>
              </div>
              <div className="col-12 col-md-5">
                <img src={hostVan.imageUrl} alt="" className="w-100" />
              </div>
              <div className="col-12   col-md-5">
                <div className="content d-flex flex-column gap-2">
                  <h2 className="fw-bold">{hostVan.name}</h2>

                  <button className=" bg-warning border-0 ">
                    {hostVan.typeofVan}
                  </button>
                  <button className="w-100 btn btn-danger w-lg-50">
                    Rent this van
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* nav row  */}
          <div className="row">
            <div className="col-12   mt-3">
              <ul className="d-flex ps-0  justify-content-start align-items-start  gap-3 gap-sm-5  w-50">
                <li>
                  <NavLink
                    to={`.`}
                    end
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Details
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`pricing`}
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Pricing
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`photos`}
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Pictures
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
        <Outlet context={{ hostVan: hostVan }}></Outlet>
     
    </>
  );
}

export async function loader(object) {
  try {
    const params = object.params;
    const id = params.id;
    const response = await fetch(
      `http://localhost:3000/api/host/getHostVanById/${id}`
    );
    if (!response.ok) {
      const myError = new Error();
      myError.message = "Error in response";
      throw myError;
    }
    const data=await response.json();
    return data;
    
  } catch (e) {
    throw e;
  }
}
