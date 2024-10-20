import React from "react";
import Home from "./home/Home";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Menu from "../components/menu/Menu";
import Footer from "../components/footer/Footer";
import Login from "./login/Login";
import "../styles/global.css";
import Applicant from "../pages/applicantOverview/ApplicantOverview";
import Interview from "../pages/interviewScheduling/InterviewScheduling";
import Profile from "./profile/Profile";
import ManageJobOpenings from "./manageJobOpenings/ManageJobOpenings";

const Layout = () => {
  const location = useLocation();
  const showSearchIcon1 = location.pathname === "/applicantOverview";
  const showSearchIcon2 = location.pathname === "/manageJobOpenings";
  return (
    <div className="main">
      <Navbar showSearchIcon1={!showSearchIcon1} />
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
        path: "/",
        element: <Home />,
      },
      {
        path: "/interviewScheduling",
        element: <Interview />,
      },
      {
        path: "/applicantOverview",
        element: <Applicant />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/manageJobOpenings",
        element: <ManageJobOpenings />,
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
