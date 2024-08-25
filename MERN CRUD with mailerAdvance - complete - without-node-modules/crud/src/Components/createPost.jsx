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
    <div className="container-fluid pt-5" style={{ minHeight: "90vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h3>{title}</h3>
            </div>
            <div className="card-body">
              <Form method="post" enctype="multipart/form-data">
                <div className="form-group mb-3">
                  <label htmlFor="postTitle" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    accept="image/*"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="postBody" className="form-label">
                    Post Body
                  </label>
                  <textarea
                    className="form-control"
                    id="postBody"
                    rows="5"
                    placeholder="Write your post here..."
                    name="body"
                    defaultValue={post && post.body}
                  ></textarea>
                </div>

                <div className="d-grid">
                  {actionData && <span>{actionData.message}</span>}
                  <button type="submit" className="btn btn-primary">
                    Submit Post
                  </button>
                  {post && (
                    <NavLink
                      to={`/my-posts`}
                      type="btn"
                      className="btn btn-danger mt-2"
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
