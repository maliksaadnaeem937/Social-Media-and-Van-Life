import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { requireAuth } from "./utility";

export default function ProtectedRoutes() {
  const loggedIn = useLoaderData();

  return (
    <>{loggedIn ? <Outlet></Outlet> : <Navigate to="/login" state={{message:"Need to login first!"}}></Navigate>}</>
  );
}

export async function loader() {
  try {
    return await requireAuth();
  } catch (error) {
    throw error;
  }
}
