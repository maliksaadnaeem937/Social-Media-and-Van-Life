import "./App.css";
import {
  createBrowserRouter,
  Route,
  Routes,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Register, {
  action as RegisterAction,
  loader as registerLoader,
} from "./Components/register";
import Home, { loader as homeLoader } from "./Components/home";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./Components/login";
import ErrorElement from "./Components/ERROR.JSX";
import NotFound from "./Components/notfound";
import MyPosts, { loader as myPostsLoader } from "./Components/myPosts";
import Profile, { loader as profileLoader } from "./Components/Profile";

import VerifyEmail, {action as verifyEmailAction, loader as verifyEmailLoader } from "./Components/verifyEmail";

import ProtectedNav from "./Components/protectedNav";
import CreatePostForm, {
  action as createPostAction,
  loader as createPostLoader,
} from "./Components/createPost";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<ErrorElement></ErrorElement>}>
        <Route
          index
          element={<Register></Register>}
          action={RegisterAction}
          loader={registerLoader}
        />

        <Route
          path="login"
          element={<Login></Login>}
          loader={loginLoader}
          action={loginAction}
        />
        <Route
          path="verify-email/:id/:token"
          element={<VerifyEmail></VerifyEmail>}
          action={verifyEmailAction}
          loader={verifyEmailLoader}
          
        />

        <Route element={<ProtectedNav></ProtectedNav>}>
          <Route path="home" element={<Home></Home>} loader={homeLoader} />
          <Route
            path="create-post"
            element={<CreatePostForm></CreatePostForm>}
            action={createPostAction}
            loader={createPostLoader}
          />
          <Route
            path="my-profile"
            element={<Profile></Profile>}
            loader={profileLoader}
          />
          <Route
            path="my-posts"
            element={<MyPosts></MyPosts>}
            loader={myPostsLoader}
          />
          <Route
            path="edit-post/:id"
            element={<CreatePostForm title={"Edit Post"}></CreatePostForm>}
            loader={createPostLoader}
            action={createPostAction}
          />
        </Route>

        <Route path="*" element={<NotFound></NotFound>} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
