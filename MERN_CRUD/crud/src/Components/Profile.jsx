import { useState } from "react";
import { useLoaderData, redirect } from "react-router-dom";
import PasswordChangeForm from "./changePasswordForm";
import '../App.css';

export default function Profile() {
  const [form, setForm] = useState(false);
  const { data } = useLoaderData();

  return (
    <>
     <div className="min-h-screen bg-gray-900 pt-10 px-4">
  <div className="overflow-x-auto max-w-5xl mx-auto">
    <table className="w-full text-left text-gray-300">
      <thead>
        <tr className="bg-gray-800">
          <th className="py-3 px-4">User Name</th>
          <th className="py-3 px-4">Email</th>
          <th className="py-3 px-4">User Id</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-gray-700 hover:bg-gray-600 transition duration-200">
          <td className="py-3 px-4">{data.name}</td>
          <td className="py-3 px-4">{data.email}</td>
          <td className="py-3 px-4">{data._id}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div className="mt-8 flex justify-center">
    <button
      type="button"
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-300"
      onClick={() => setForm((curr) => (curr === true ? false : true))}
    >
      Change Password
    </button>
  </div>

  {form && (
    <div className="mt-6 flex justify-center">
      <PasswordChangeForm />
    </div>
  )}
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
