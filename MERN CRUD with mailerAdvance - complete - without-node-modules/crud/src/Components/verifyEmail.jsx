import { Form, useActionData, useLoaderData, redirect } from "react-router-dom";

export default function VerifyEmail() {
  const actionData = useActionData();
  return (
    <>
      <div className="container-fluid    py-5">
        <h2 className="text-center text-danger ">Verify Email</h2>

        <Form
          method="post"
          action=""
          className="d-flex flex-column gap-2 justify-content-center align-items-center"
        >
          <input
            type="password"
            placeholder="previous password"
            name="password"
          />
          <input
            type="password"
            placeholder="new password"
            name="new_password"
          />
          {actionData && <span className="text-danger p-2">{actionData}</span>}
          <button type="submit" className="btn btn-warning">
            submit
          </button>
        </Form>
      </div>
      <Form method="post">
        <button className="btn btn-primary" type="submit">
          Resend Email
        </button>
      </Form>
    </>
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
