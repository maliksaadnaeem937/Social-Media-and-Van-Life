import { Form, useActionData, useLoaderData, redirect } from "react-router-dom";





export default function VerifyEmail() {
  const actionData = useActionData();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-600 text-center mb-6">
          Verify Email
        </h2>

        <Form
          method="post"
          action=""
          className="space-y-4"
        >
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Previous Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your previous password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="new_password" className="block text-gray-700 font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              id="new_password"
              name="new_password"
              placeholder="Enter your new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {actionData && (
            <div className="text-red-600 text-center mt-2">
              {actionData}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Submit
          </button>
        </Form>

        <div className="mt-6 text-center">
          <Form method="post">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Resend Email
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
































export async function loader({ request }) {
  const url = request.url;
  const urlArray = url.split("/");
  const length = urlArray.length;

  const token = urlArray[length - 1];
  const id = urlArray[length - 2];

  try {
    const response = await fetch(
      `http://localhost:8000/api/verify-email/${id}/${token}`
    );
    console.log(response);
    if (!response.ok) {
      return redirect("/");
    }
    return null;
  } catch (e) {
    throw e;
  }
}

export async function action({ request }) {
  const formData = await request.formData();

  const password = formData.get("password");
  const new_password = formData.get("new_password");
  const url = request.url;
  const urlArray = url.split("/");
  const length = urlArray.length;
  const token = urlArray.at(-1);// can also use length-1
  const id = urlArray.at(-2);//can also use length-2
  let api_end_point;
  if (password && new_password) {
    api_end_point = "http://localhost:8000/api/verify-email";
  } else {
    api_end_point = `http://localhost:8000/api/resend-email`;
  }
  console.log(api_end_point);

  try {
    const response = await fetch(`${api_end_point}/${id}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        new_password,
      }),
    });
    // console.log(response);

    if (!response.ok) {
      const error = await response.json();
      return error.message;
    } else if (response.status === 200) {
      const success = await response.json();
      const message = success.data;
      return message;
    } else {
      const success = await response.json();
      const token = success.data;
      localStorage.setItem("token", JSON.stringify(token));
      return redirect("/home");
    }
  } catch (e) {
    throw e;
  }
}
