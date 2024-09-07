
import { useLoaderData } from "react-router-dom";
import CreatePostForm from "./createPost";
import PostCard from "./postCard";
import { useState } from "react";
import '../App.css';
export default function MyPosts() {
  const { data } = useLoaderData();

  const allPosts = data.map((post) => (
    <PostCard post={post} key={post._id} addDeleteButton={true}></PostCard>
  ));

  return (
    <>
      <div className="min-h-screen bg-gray-900 pt-32">
        <div className="container mx-auto px-4 space-y-6">
          {allPosts.length > 0 ? (
            allPosts
          ) : (
            <h2 className="text-center text-white text-2xl pt-10">
              No posts to show
            </h2>
          )}
        </div>
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
