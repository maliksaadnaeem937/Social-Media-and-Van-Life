import styles from "./homepage.module.css";
import { NavLink } from "react-router-dom";
import { useLoaderData, useNavigation } from "react-router-dom";

export function loader(){

  return "THIS IS HOME PAGE data";
}

export default function Homepage() {
  const data = useLoaderData();
  const navigate = useNavigation();
  console.log(navigate);

  if (navigate.state === "loading")
    return <h2 className="text-center">Loading Data...</h2>;
  console.log(data);
  return (
    <>
      <div className="container-fluid  px-0 background-image ">
        <div className={`${styles.content} text-center  pt-5 pb-5`}>
          <h3 className="pb-2 ">
            You got the travel plans, We got the travel vans.
          </h3>
          <p>
            Add adventure to your life by joining the vanlife moment.Rent the
            perfect van to make your perfect road trip
          </p>

          <NavLink className="btn btn-secondary w-50 mt-3" to="/vans">
            Find your van
          </NavLink>
        </div>
      </div>
    </>
  );
}
