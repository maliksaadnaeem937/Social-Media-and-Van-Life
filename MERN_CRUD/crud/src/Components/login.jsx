import { useState, useEffect } from "react";

import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Login() {
  const actionData = useActionData();
  const { message } = useLoaderData() || "";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-gray-600 text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold py-4 tracking-wide text-red-500">
          Login Here
        </h2>

        {message && (
          <div className="text-center text-sm text-yellow-400 py-1">
            {message}
          </div>
        )}

        <Form
          method="post"
          action=""
          className="space-y-4 flex flex-col items-center"
        >
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
          
          {actionData && (
            <span className="text-red-500 text-sm mt-2">{actionData}</span>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md font-semibold tracking-wide transition duration-200"
          >
            Submit
          </button>
        </Form>

        <div className="text-center mt-4">
          <span className="text-gray-400">Don't have an account? </span>
          <NavLink to="/" className="text-indigo-400 hover:underline">
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export async function loader({ request }) {
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
    let url = new URL(request.url);
    let params = new URLSearchParams(url.search);
    const message = params.get("message");
    const otp = params.get("otp");
    if (message) return { message: "Please Login To Access Protected Route!" };
    else return null;
  } catch (e) {
    throw e;
  }
}

export async function action({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const response = await fetch("http://localhost:8000/api/login_user", {
      method: "POST", // Specify the HTTP method as POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.status === 400) {
      const error = await response.json();
      return error.message;
    } else if (response.status === 200) {
      const result = await response.json();
      const token = result.data;
      localStorage.setItem("token", JSON.stringify(token));
      return redirect("/home");
    }
  } catch (e) {
    throw e;
  }
  return null;
}
