import React from "react";
import Home from "./home/Home";
import MonitorPerformance from "./monitorPerformance/MonitorPerformance";
import ManageUserRoles from "./manageUserRoles/ManageUserRoles";
import CRUDUserData from "./crudUserData/CRUDUserData";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Menu from "../components/menu/Menu";
import Footer from "../components/footer/Footer";
import Login from "./login/Login";
import "../styles/global.css";

const Layout = () => {
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <Outlet />
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
      // {
      //   path: "/user",
      //   element: <CRUDUserData />,
      // },
      {
        path: "/userRoles",
        element: <ManageUserRoles />,
      },
      // {
      //   path: "/monitorPerformance",
      //   element: <MonitorPerformance />,
      // },
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
