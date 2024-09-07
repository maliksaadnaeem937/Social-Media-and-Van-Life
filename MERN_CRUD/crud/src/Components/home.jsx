import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import PostCard from "./postCard";

export default function Home() {
  const { data } = useLoaderData();
  console.log(data);

  const allPosts = data.map((post, index) => (
    <PostCard post={post} key={index}></PostCard>
  ));

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center pt-20">
      <div className="w-full max-w-5xl flex flex-col gap-5 pt-10 px-4">
        {allPosts.length > 0 ? (
          allPosts
        ) : (
          <h2 className="text-center text-white text-2xl pt-5">
            No posts to show
          </h2>
        )}
      </div>
    </div>
  );
  
}

export async function loader() {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await fetch("http://localhost:8000/api/getPosts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    
    });
    // console.log(response);
    if (response.status === 302) {
     return redirect('/login?message=PleaseLogintoaccessthehomepage')
    }
    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
}
