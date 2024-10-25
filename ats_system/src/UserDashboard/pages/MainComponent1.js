import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import ApplyForJobOpenings from "./applyForJobOpening/ApplyForJobOpenings";
import CheckStatusOfApplications from "./checkStatusOfApplications/CheckStatusOfApplications";
import SearchJobs from "./searchJobs/SearchJobs";
import Profile from "./profile/Profile";
import Login from "../../HiringManagerDashboardFiles/pages/login/Login";
import Navbar from "../../HiringManagerDashboardFiles/components/navbar/Navbar";
import Footer from "../../HiringManagerDashboardFiles/components/footer/Footer";
import Menu from "../components/menu/Menu";

const Layout = () => {
  const location = useLocation();
  const showSearchIcon1 = location.pathname === "/applicantOverview";
  const showSearchIcon2 = location.pathname === "/manageJobOpenings";
  return (
    <div className="main">
      {/* <Navbar showSearchIcon1={!showSearchIcon1} /> */}
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <Outlet context={{ showSearchIcon2: !showSearchIcon2 }} />
          {/* Outlet is a placeholder that allows you to render nested routes within a parent route. Means you can define routes that are rendered inside other routes. Useful for building complex UIs with shared layouts. */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/userProfile",
        element: <Profile />,
      },
      {
        path: "/apply",
        element: <ApplyForJobOpenings />,
      },
      {
        path: "/status",
        element: <CheckStatusOfApplications />,
      },
      {
        path: "/searchJobs",
        element: <SearchJobs />,
      },
      {
        path: "*",
        element: <Navigate to="/" />, // Redirect to Home for unmatched routes
      },
    ],
  },

  // separated the child from the parent for auth purposes (isolated access. redirect users to the login page if they are not authenticated when trying to access protected routes)
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
