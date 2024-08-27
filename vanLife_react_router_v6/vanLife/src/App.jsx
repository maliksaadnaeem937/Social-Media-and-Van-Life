import NavBar from "./Components/navBar";
import AllVans, { loader as allVansPageLoader } from "./Components/Allvans";
import Homepage, { loader as homePageLoader } from "./Components/homepage";
import VanInfo,{loader as vanInfoLoader} from "./Components/vanInfo";
import About from "./Components/About";
import HostNav from "./Components/HostNav";
import Dashboard from "./Components/DashBoard";
import Income from "./Components/Income";
import Reviews from "./Components/Reviews";
import ListedVans, {
  loader as allHostVansLoader,
} from "./Components/AllHostVans";
import HostVanInfo,{loader as hostVanInfoLoader} from "./Components/hostVanInfo";
import HostVanDetails from "./Components/hostVandetail";
import Photos from "./Components/hostVansPhotos";
import Pricing from "./Components/hostVanPricing";
import Login from "./Components/Login";
import ProtectedRoutes,{loader as ProtectedRoutesLoader} from "./Components/Protected";

import ErrorElement from "./Components/error";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      errorElement={<ErrorElement></ErrorElement>}
      element={<NavBar></NavBar>}
    >
      <Route index element={<Homepage></Homepage>} loader={homePageLoader} />
      <Route path="login" element={<Login></Login>}  />
      <Route path="about" element={<About></About>} />
      <Route
        path="vans"
        element={<AllVans></AllVans>}
        loader={allVansPageLoader}
      />
      <Route path="vans/:id" element={<VanInfo></VanInfo>}  loader={vanInfoLoader}/>


      <Route element={<ProtectedRoutes></ProtectedRoutes>} loader={ProtectedRoutesLoader}>

      <Route path="host" element={<HostNav></HostNav>}>
        <Route index element={<Dashboard></Dashboard>} />
        <Route path="income" element={<Income></Income>} />
        <Route path="reviews" element={<Reviews></Reviews>} />
        <Route
          path="vans"
          element={<ListedVans></ListedVans>}
          loader={allHostVansLoader}
        />

        <Route path="vans/:id" element={<HostVanInfo></HostVanInfo>} loader={hostVanInfoLoader}>
          <Route index element={<HostVanDetails></HostVanDetails>} />
          <Route path="pricing" element={<Pricing></Pricing>} />
          <Route path="photos" element={<Photos></Photos>} />
        </Route>
      </Route>
      </Route>



    </Route>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
