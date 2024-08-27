import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useLoaderData } from "react-router-dom";
import { useSearchParams,useNavigation } from "react-router-dom";

export default function AllVans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
const navigate=useNavigation();
console.log(navigate);

 if(navigate.state==='loading') return <h2 className="text-center">Loading Data...</h2>

const vans=useLoaderData();
  const filteredVans = type
    ? vans.filter((van) => van.typeofVan === type)
    : vans;

  return (
    <div className="container-fluid bg-dark">
      <div className="container">
        <h3>Explore Our Van Options</h3>

        <div className="d-flex justify-content-center gap-2 flex-wrap">
          <a
            className="btn btn-secondary d-inline-block"
            onClick={() => setSearchParams({ type: "simple" })}
          >
            Simple
          </a>
          <a
            className="btn btn-secondary d-inline-block"
            onClick={() => setSearchParams({ type: "luxury" })}
          >
            Luxury
          </a>
          <a
            className="btn btn-secondary d-inline-block"
            onClick={() => setSearchParams({ type: "rugged" })}
          >
            Rugged
          </a>
          <NavLink className="btn btn-secondary d-inline-block" to=".">
            Clear All
          </NavLink>
        </div>

        { filteredVans.length === 0 ? (
          <div>No data</div>
        ) : (
          <div className="row mt-5 justify-content-center gap-2">
            {filteredVans.map((van) => (
              <div className="card" style={{ width: "18rem" }} key={van._id}>
                <NavLink to={`${van._id}`}>
                  <img
                    className="card-img-top"
                    src={van.imageUrl}
                    alt="Van"
                    style={{ height: "150px", width: "200px" }}
                  />
                </NavLink>
                <div className="card-body">
                  <h5 className="card-title">{van.name}</h5>
                  <div className="btn-container d-flex flex-column gap-2">
                    <button className="btn btn-danger w-100">
                      {van.typeofVan}
                    </button>
                    <button type="button" className="btn btn-primary w-100">
                      {van.price} <span className="badge badge-light">$</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export  async function loader (){
    try {
      await sleep(2000);
      const response = await fetch(
        "http://localhost:3000/api/getAllVans"
      );
     
      if(!response.ok){
       
        const result = await response.json();
     
        const error=new Error();
        error.message=result.message;
   
        throw error;
      }
      const data=await response.json();
      return data.data;
    } catch (error) {
      console.log(error.message);

      throw error;
      
    }
  };
  
