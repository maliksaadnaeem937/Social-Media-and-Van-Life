
import { useLoaderData } from "react-router-dom";
import CreatePostForm from "./createPost";
import PostCard from "./postCard";
import { useState } from "react";
import '../App.css';
export default function MyPosts() {
  const { data } = useLoaderData();
  
 
 
  
  const allPosts = data.map((post) => (
    <PostCard post={post} key={post._id} addDeleteButton={true}  ></PostCard>
  ));

  return (
    <>
    <div className="container-fluid  d-flex gap-3 flex-column bg-dark pt-5 " style={{minHeight:'90vh'}}>
      {allPosts.length > 0 ? (
        allPosts
      ) : (
        <h2 className="text-center text-white pt-5">No posts to show</h2>
      )}
    </div>

   
</>
  );
}

export async function loader() {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(
      "http://localhost:8000/api/getUserSpecificPosts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 302) {
      throw new Error("Please login");
    }
    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
}
