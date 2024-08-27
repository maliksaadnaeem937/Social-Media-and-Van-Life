import { useNavigation } from "react-router-dom";

export default function About() {
  const navigate = useNavigation();
  console.log(navigate);

  if (navigate.state === "loading") {
    return <h1 className="text-center">Loading data....</h1>;
  }
  return (
    <>
      <div className="container-fluid  ">
        <div className="container ">
          <div className="row justify-content-start  align-items-start">
            <div className="col-md-5">
              <img
                src="https://images.unsplash.com/photo-1478375846947-1abd989ab195?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGltYWdlJTIwYmJsYWNrJTIwbGlnaHR8ZW58MHx8MHx8fDA%3D"
                className="w-100"
                alt=""
              />
            </div>
            <div className="col-md-5 pt-3 pt-md-0">
              <div className="content  ">
                <h2 className="fw-bold pb-2  ">
                  Dont Squeeze in a sedan when you could relax in a van
                </h2>
                <p className="">
                  Our mission is to enliven your road trip with the perfect
                  travel van rental.Our vans are recertified before each trip to
                  ensure your travel plans can go off without a hitch. "((Hitch
                  Costs extra))"
                </p>
              </div>
              ;
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
