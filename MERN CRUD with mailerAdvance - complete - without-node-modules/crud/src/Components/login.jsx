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
    <div className="container-fluid    py-5">
      <h2 className="text-center text-danger ">Login here</h2>
      {message && <div className="text-center fw-small py-1">{message}</div>}

      <Form
        method="post"
        action=""
        className="d-flex flex-column gap-2 justify-content-center align-items-center"
      >
        <input type="email" placeholder="email" name="email" />
        <input type="password" placeholder="password" name="password" />
        {actionData && <span>{actionData}</span>}
        <span>Dont have an account?</span>
        <NavLink to={"/"}>Register</NavLink>
        <button type="submit" className="btn btn-warning">
          submit
        </button>
      </Form>
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
