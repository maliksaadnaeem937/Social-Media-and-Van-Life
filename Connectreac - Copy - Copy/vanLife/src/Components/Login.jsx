import { useState } from "react";
import {
  NavLink,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";
export default function Login() {
  const navigate = useNavigation();
  console.log(navigate);

  if (navigate.state === "loading")
    return <h2 className="text-center">Loading Data...</h2>;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    await sendDataToServer(formData);
  };

  const location = useLocation();

  const message = location.state?.message || "";
  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center bg-dark login-form">
        <form
          action=""
          className="d-flex flex-column gap-4  login-form-class"
          onSubmit={(e) => submitForm(e)}
        >
          <h3 className="login-heading">Login Yourself</h3>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              onchangeHandler(e);
            }}
            name="email"
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            onChange={(e) => {
              onchangeHandler(e);
            }}
          />

          <button type="submit" className=" btn btn-success">
            {navigate.state === "submitting" ? "Logging in..." : "Login"}
          </button>

          {message != null && message != "" ? message : null}

          <span>Dont Have an account?</span>
          <NavLink className="link">Register</NavLink>
        </form>
      </div>
    </>
  );
}
