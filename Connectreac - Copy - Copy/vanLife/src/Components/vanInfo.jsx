import { NavLink, useLoaderData } from "react-router-dom";
import styles from "./vanInfo.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function VanInfo() {
  

  const van=useLoaderData()
  // const { id } = useParams();

  // useEffect(() => {
  //   const getById = async () => {
  //     const data = await axios.get(`http://localhost:3000/api/getByid/${id}`);
  //     setVan(data.data);
  //     console.log(data.data);
  //   };
  //   getById();
  // }, []);


  return (
    <>
      <div className="container-fluid  ">
        <div className="container">
        <NavLink
          className={`text-decoration-none  color-black fw-bold mt-3 `}
          to={`/vans`}
        >
          Back to all vans
        </NavLink>
        {van === null ? (
          <div>No data </div>
        ) : van ? (
          <div className="row  align-items-center  ">
            <div className="col-12 col-sm-8 col-md-4">
              <img
                src={van.imageUrl}
                alt=""
                className="w-100"
               
              />
            </div>
            <div className="col-12  col-sm-8 col-md-5">
              <div className="content d-flex flex-column gap-2">
              <h2 className="fw-bold">{van.name}</h2>
              <p>{van.description}</p>
              <span className="fw-bold">Price {van.price}$</span>
              <button className={`${styles.vanTypeBtn} bg-warning border-0 `}>
                {van.typeofVan}
              </button>
              <button className="w-100 btn btn-danger w-lg-50">
                Rent this van
              </button>
            </div>
            </div>
          </div>
        ) : null}
      </div>
      </div>
    </>
  );
}



export async function loader(object){

  try{
    console.log(object);
    const params=object.params;
    const id = params.id;
    const response= await fetch(`http://localhost:3000/api/getByid/${id}`);

    if(!response.ok){
      
      const myError=new Error();
      const result = await response.json();
      myError.message=result.message;
      throw(myError);
  
    }
 const data=await response.json();
 console.log(data);
 return data;
  

  }catch(e){
    throw (e);
  }
 

  


}