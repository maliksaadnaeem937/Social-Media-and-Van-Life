import { Form } from "react-router-dom";
import { useActionData } from "react-router-dom";
import { redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Register() {
  const { error, success } = useActionData() || {};

  return (
    <div className="container-fluid py-5">
      <h2 className="text-center text-danger">Register here</h2>
      <Form
        method="post"
        action=""
        className="d-flex flex-column gap-2 justify-content-center align-items-center"
      >
        <input type="text" placeholder="name" name="name" />
        <input type="email" placeholder="email" name="email" />
        <input type="password" placeholder="password" name="password" />
        <input
          type="password"
          placeholder="password confirmation"
          name="passwordConfirmation"
        />
        {error && <span className="text-danger">{error}</span>}
        {success && <span className="text-success">{success}</span>}
        <span>Already have an account?</span>
        <NavLink to={"/login"}>Login</NavLink>
        <button type="submit" className="btn btn-warning">
          Submit
        </button>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const password = formData.get("password").trim();
  const passwordConfirmation = formData.get("passwordConfirmation").trim();

  if (password !== passwordConfirmation) {
    return { error: "Password and password confirmation do not match" };
  }

  try {
    const response = await fetch("http://localhost:8000/api/register_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: data.message };
    }

    if (response.status === 201 || response.ok) {
      return { success: "Email sent to user!" };
    }
  } catch (e) {
    return { error: e.message };
  }

  return { error: "An unexpected error occurred." };
}

export async function loader() {
  try {
    const token = JSON.parse(localStorage.getItem("token"));

    const response = await fetch(
      "http://localhost:8000/api/if_logged_redirect",
      {
        method: "GET", // Specify the HTTP method as POST
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 302) {
      return redirect("/home");
    }
  } catch (e) {
    throw e;
  }
  return null;
}
