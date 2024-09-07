import {
  Form,
  useActionData,
  redirect,
  useLocation,
  NavLink,
} from "react-router-dom";
const CreatePostForm = ({ title = "Create Post" }) => {
  const location = useLocation();
  const { post } = location.state || "";

  const actionData = useActionData();
  return (
    <div className="flex justify-center items-center pt-20 min-h-screen bg-gray-100">
  <div className="w-full max-w-2xl">
    <div className="bg-white shadow-lg rounded-lg">
      <div className="bg-blue-600 text-white p-4 text-center rounded-t-lg">
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="p-6">
        <Form method="post" encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
              Image
            </label>
            <input
              type="file"
              className="block w-full text-gray-700 bg-gray-200 rounded-lg px-4 py-2 border focus:border-blue-500 focus:outline-none"
              id="image"
              name="image"
              accept="image/*"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="postBody" className="block text-gray-700 font-medium mb-2">
              Post Body
            </label>
            <textarea
              className="block w-full h-40 px-4 py-2 bg-gray-200 rounded-lg border focus:border-blue-500 focus:outline-none"
              id="postBody"
              rows="5"
              placeholder="Write your post here..."
              name="body"
              defaultValue={post && post.body}
            ></textarea>
          </div>

          <div className="mt-6">
            {actionData && (
              <span className="block text-center text-red-600 mb-4">
                {actionData.message}
              </span>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Submit Post
            </button>
            {post && (
              <NavLink
                to={`/my-posts`}
                className="block mt-4 text-center bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Cancel
              </NavLink>
            )}
          </div>
        </Form>
      </div>
    </div>
  </div>
</div>

  );
};

export default CreatePostForm;

export async function action({ request }) {
  const formData = await request.formData();
  const image = formData.get("image");
  const body = formData.get("body");
  const multiPartFormData = new FormData();
  multiPartFormData.append("body", body);
  multiPartFormData.append("image", image);

  const array = request.url.split("/");
  const length = array.length;
  let url = "";
  if (array.includes("create-post")) {
    url = "create-post";
  } else {
    url = `edit-post/${array[length - 1]}`;
  }

  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(
      `http://localhost:8000/api/${url}`,

      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: multiPartFormData,
      }
    );
    if (response.status === 302) {
      throw new Error("Please login first");
    } else if (response.status === 400) {
      const errorObject = await response.json();
      throw errorObject;
    } else if (!response.ok) {
      throw await response.json();
    } else {
      console.log("post edited");
    }
    return redirect("/home");
  } catch (e) {
    return e;
  }
}

export async function loader() {
  console.log("loader for create post");
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await fetch("http://localhost:8000/api/get-create-post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    if (response.status === 302) {
      throw new Error("Please login");
    }
  } catch (e) {
    throw e;
  }
  return null;
}
