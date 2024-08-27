import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
export default function ListedVans() {


  // useEffect(() => {
  //   const fetchAllHostVans = async () => {
  //     try {
  //       const hostId = "host1";
  //       const data = await axios.get(
  //         `http://localhost:3000/api/host/${hostId}`
  //       );
  //       setHostVans(data.data);
  //       console.log(data.data);
  //     } catch (e) {
  //       console.log(e);
  //     }

    
  //   };
  //   fetchAllHostVans();
  // }, []);


  const hostVans=useLoaderData();
  console.log(hostVans);

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <h3 className="fw-bold mt-3">Your Listed Vans</h3>

          {hostVans.length > 0 ?
           ( hostVans.map((van, index) => (
              <div className="row mt-3" key={index}>
                <div className="col-12 col-md-7">
                  <div className="content d-flex align-items-start gap-3">
                    <NavLink to={`/host/vans/${van._id}`} className={`text-decoration-none d-block`}>
                    <img
                      src={van.imageUrl}
                      alt="none"
                      style={{ height: "70px ", width: "70px" }}
                    />
                    </NavLink>
                    <div className="details ">
                      <h6 className="">{van.name}</h6>
                      <p>${van.price}/day</p>
                    </div>
                  </div>
                </div>
              </div>
            ))):(<div>No data to show</div>)}
        </div>
      </div>
    </>
  );
}


export async function loader(){

  try{
    const hostId = "host1";
    const response=await fetch(`http://localhost:3000/api/host/${hostId}`);
    if(!response.ok){

     const object=await response.json();
     console.log('error,',object);
      const myError=new Error;
      myError.message=object.message;

      throw myError;
    }
   return await response.json();
    

  }
  catch(e){
    throw e;
  }




}