import { useState } from "react";
import { useLoaderData, redirect } from "react-router-dom";
import PasswordChangeForm from "./changePasswordForm";
import '../App.css';

export default function Profile() {
  const [form, setForm] = useState(false);
  const { data } = useLoaderData();

  return (
    <>
      <div
        className="container-fluid bg-dark pt-5"
        style={{ minHeight: "90vh" }}
      >
        <table className="table table-dark over-flow-x-auto">
          <thead>
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">User Id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data._id}</td>
            </tr>
          </tbody>
        </table>
        <div className="row mt-4">
          <div className="col-12 col-sm-6 col-md-4 ">
            <button
              type="btn"
              className="btn btn-primary"
              onClick={() => setForm((curr) => (curr === true ? false : true))}
            >
              Change password
            </button>
          </div>
        </div>
        {
            form && <PasswordChangeForm></PasswordChangeForm>
        }
      </div>
    </>
  );
}

export async function loader() {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await fetch("http://localhost:8000/api/get-profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 302) {
      return redirect("/login?message=PleaseLogintoaccessthehomepage");
    }
    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
}
