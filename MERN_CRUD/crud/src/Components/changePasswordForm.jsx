import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PasswordChangeForm() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const onChangeHandler = (event) => {
    setFormData((current) => {
      return {
        ...current,
        [event.target.name]: event.target.value,
      };
    });
  };

  async function changePasswordFunction(object) {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(
        ` http://localhost:8000/api/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(object),
        }
      );
      if (response.status === 302) {
        return navigate("/login?PleaseLoginToAccess");
      } else if (response.status === 400) {
        const { message } = await response.json();
        return setError(message);
      } else {
        setSuccess("Operation successful!");
        const data = await response.json();
        console.log(data.data);
      }
    } catch (e) {
      setError(e.message);
    }
  }

  const onSubmitHandler = async (e) => {
    setSuccess(null);
    setError(null);
    e.preventDefault();
    const { currentPassword, newPassword, confirmNewPassword } = formData;
    currentPassword.trim();
    newPassword.trim();
    confirmNewPassword.trim();

    if (newPassword !== confirmNewPassword) {
      return setError("Passwords Do Not Match!");
    } else {
      setSubmitting((curr) => !curr);
      await changePasswordFunction({
        currentPassword,
        newPassword,
      });
      setSubmitting((curr) => !curr);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl text-white font-semibold mb-6">
          Change Password
        </h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <div>
            <label htmlFor="currentPassword" className="text-gray-400 block mb-2">
              Current Password:
            </label>
            <input
              type="password"
              name="currentPassword"
              required
              className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.currentPassword}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="text-gray-400 block mb-2">
              New Password:
            </label>
            <input
              type="password"
              name="newPassword"
              required
              className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.newPassword}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div>
            <label
              htmlFor="confirmNewPassword"
              className="text-gray-400 block mb-2"
            >
              Confirm New Password:
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              required
              className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.confirmNewPassword}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          {error && <div className="text-center text-red-500">{error}</div>}
          {success && <div className="text-center text-green-500">{success}</div>}
          <button
            type="submit"
            className={`w-full py-2 mt-4 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
  
}
