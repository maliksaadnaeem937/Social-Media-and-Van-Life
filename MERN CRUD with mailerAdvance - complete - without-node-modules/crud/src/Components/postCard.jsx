import { useNavigate } from "react-router-dom";

export default function PostCard({ post, addDeleteButton }) {
  const navigate = useNavigate();
  const deletePost = async (post_id) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch("http://localhost:8000/api/deletePost", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post_id,
        }),
      });

      if (response.status === 200) {
        console.log("Post deleted");
        navigate("/my-posts");
      } else if (!response.ok) {
        const result = await response.json();
        console.log(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editPost = (post_id) => {
    navigate(`/edit-post/${post_id}`, {
      state: {
        post,
      },
    });
  };

  return (
    <>
      <div
        className="card border shadow-lg"
        style={{ width: "20rem", borderRadius: "15px", overflow: "hidden" }}
      >
        {post.image && (
          <img
            src={`http://localhost:8000/${post.image}`}
            className="card-img-top"
            alt="Card image"
            style={{ height: "200px", objectFit: "cover" }}
           
          />
        )}

        <div className="card-body p-4">
          {post.body &&   <p className="card-text text-secondary">{post.body}</p>}

       

          <div className="text-muted small text-center">
            {new Date(post.created_at).toLocaleDateString()}
          </div>
          <div className="text-info font-weight-bold text-center">
            {post.user_name}
          </div>

          {addDeleteButton && (
            <div className="d-flex justify-content-between flex-column mt-4">
              <button
                type="button"
                className="btn btn-outline-danger mb-2"
                onClick={(e) => deletePost(post._id)}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-outline-warning"
                onClick={() => editPost(post._id)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
