import { React, useEffect, useState } from "react";
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
import Profile1 from "./profile/Profile";
import ManageJobOpenings from "./manageJobOpenings/ManageJobOpenings";
import Profile2 from "../../UserDashboard/pages/profile/Profile";
import ApplyForJobOpenings from "../../UserDashboard/pages/applyForJobOpening/ApplyForJobOpenings";
import CheckStatusOfApplications from "../../UserDashboard/pages/checkStatusOfApplications/CheckStatusOfApplications";
import SearchJobs from "../../UserDashboard/pages/searchJobs/SearchJobs";

const Layout = ({ userRole }) => {
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
          <Outlet context={{ showSearchIcon2: !showSearchIcon2, userRole }} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  // const [userRole, setUserRole] = useState(null);

  // useEffect(() => {
  //   const fetchUserRole = async () => {
  //     const response = await fetch("/getUserRole");
  //     const data = await response.json();
  //     setUserRole(data.role);
  //   };
  //   fetchUserRole();
  // }, []);

  // if (userRole === null) {
  //   return <div>Loading...</div>; // Show a loading state while fetching
  // }

  const router = createBrowserRouter([
    {
      path: "/",
      // element: <Layout userRole={userRole} />,
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/interviewScheduling",
          element: <Interview />,
          // element: userRole === "manager" ? <Interview /> : <Navigate to="/" />,
        },
        {
          path: "/applicantOverview",
          element: <Applicant />,
          // element: userRole === "applicant" ? <Applicant /> : <Navigate to="/" />,
        },
        {
          path: "/profile",
          element: <Profile1 />,
          // element: userRole === "applicant" || userRole === "manager" ? <Profile1 /> : <Navigate to="/" />,
        },
        {
          path: "/manageJobOpenings",
          element: <ManageJobOpenings />,
          // element: userRole === "manager" ? <ManageJobOpenings /> : <Navigate to="/" />,
        },
        // {
        //   path: "/userProfile",
        //   element: <Profile2 />,
        // },
        // {
        //   path: "/profile",
        //   element: userRole === "applicant" || userRole === "manager" ? <Profile1 /> : <Navigate to="/" />,
        // },
        // {
        //   path: "/apply",
        //   element: <ApplyForJobOpenings />,
        //   // element: userRole === "applicant" ? <ApplyForJobOpenings /> : <Navigate to="/" />,
        // },
        // {
        //   path: "/status",
        //   // element: <CheckStatusOfApplications />,
        //   element:
        //     userRole === "applicant" ? (
        //       <CheckStatusOfApplications />
        //     ) : (
        //       <Navigate to="/" />
        //     ),
        // },
        // {
        //   path: "/searchJobs",
        //   element: <SearchJobs />,
        //   // element: userRole === "applicant" ? <SearchJobs /> : <Navigate to="/" />,
        // },
        {
          path: "*",
          element: <Navigate to="/" />, // Redirect to Home for unmatched routes
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

// the MainComponent is going to conditionally render pages based on userRole
// from the backend authentication
// fetch user role from backend
// store the user role using react states or context
// conditional rendering in the router
