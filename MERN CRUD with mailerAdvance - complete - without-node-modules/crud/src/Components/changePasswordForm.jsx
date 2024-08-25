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
    <div className="container">
      <h2 className="text-center">Change Password</h2>
      <form
        className="d-flex flex-column gap-3"
        onSubmit={(e) => onSubmitHandler(e)}
      >
        <div>
          <label htmlFor="currentPassword" className="text-white">
            Current Password:
          </label>
          <input
            type="password"
            name="currentPassword"
            required
            className="form-control"
            value={formData.currentPassword}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>
        <div>
          <label htmlFor="newPassword" className="text-white">
            New Password:
          </label>
          <input
            type="password"
            name="newPassword"
            required
            className="form-control"
            value={formData.newPassword}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>
        <div>
          <label htmlFor="confirmNewPassword" className="text-white">
            Confirm New Password:
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            required
            className="form-control"
            value={formData.confirmNewPassword}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>
        {error && <div className="text-center text-warning">{error}</div>}
        {success && <div className="text-center text-warning">{success}</div>}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting === true}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
