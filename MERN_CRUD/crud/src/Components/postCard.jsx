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
  className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
>
  {post.image && (
    <img
      src={`http://localhost:8000/${post.image}`}
      alt="Card image"
      className="w-full h-48 object-cover"
    />
  )}

  <div className="p-4">
    {post.body && (
      <p className="text-gray-600 text-base">{post.body}</p>
    )}

    <div className="text-gray-500 text-sm text-center mt-3">
      {new Date(post.created_at).toLocaleDateString()}
    </div>

    <div className="text-blue-600 font-semibold text-center mt-1">
      {post.user_name}
    </div>

    {addDeleteButton && (
      <div className="flex justify-between items-center mt-6 space-x-2">
        <button
          type="button"
          className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
          onClick={() => deletePost(post._id)}
        >
          Delete
        </button>
        <button
          type="button"
          className="w-full py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition duration-200"
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
