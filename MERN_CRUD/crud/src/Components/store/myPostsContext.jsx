import { createContext, useState } from "react";



export default function MyPostsProvider({ children }) {








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
  
