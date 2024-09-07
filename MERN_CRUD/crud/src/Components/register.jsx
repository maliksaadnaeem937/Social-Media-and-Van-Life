import { Form } from "react-router-dom";
import { useActionData } from "react-router-dom";
import { redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Register() {
  const { error, success } = useActionData() || {};

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-600 text-white min-h-screen flex justify-center items-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold py-4 tracking-wide">
          Register Here
        </h2>

        <Form
          method="post"
          action=""
          className="space-y-4 flex flex-col items-center"
        >
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirmation"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {error && (
            <span className="text-red-500 text-sm text-center mt-2">
              {error}
            </span>
          )}
          {success && (
            <span className="text-green-500 text-sm text-center mt-2">
              {success}
            </span>
          )}

          <button
            type="submit"
            className="w-full mt-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md font-semibold tracking-wide transition duration-200"
          >
            Submit
          </button>
        </Form>

        <div className="text-center mt-4">
          <span className="text-gray-400">Already have an account? </span>
          <NavLink to="/login" className="text-indigo-400 hover:underline">
            Login
          </NavLink>
        </div>
      </div>
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
