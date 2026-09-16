import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import JobSeekersLanding from "../Pages/CV";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import CreateJob from "../Pages/CreateJob";
import UpdateJob from "../Pages/UpdateJob";
import JobDetails from "../Pages/JobDetails";
import Login from "../Pages/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import SignupPage from "../Pages/Signup";
import CreateUserProfile from "../Pages/CreateProfile";
import PaymentCancelled from "../Pages/payfast/payment-cancelled";
import PaymentSuccess from "../Pages/payfast/payment-success";
import PayfastGuard from "../utils/PayfastGuard";
import ServicesPage from "../Pages/Services";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />, // Public route
      },
      {
        path: "/about",
        element: <About />, // Public route
      },
      {
        path: "/contact",
        element: <Contact />, // Public route
      },
      {
        path: "/services",
        element: <ServicesPage />, // Public route
      },
      {
        path: "/my-job",
        element: (
          <PrivateRoute>
            <MyJobs />
          </PrivateRoute>
        ), // Protected route
      },
      {
        path: "/salary",
        element: <SalaryPage />, // Public route
      },
      {
        path: "/create-profile",
        element: (
          <PrivateRoute>
            <CreateUserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/job-seekers",
        element: <JobSeekersLanding />, // Public route
      },
      {
        path: "/payment-cancelled",
        element: (
          // <PayfastGuard>
          <PaymentCancelled />
          // </PayfastGuard>
        ), // Public route
      },
      {
        path: "/payment-success",
        element: (
          // <PayfastGuard>
          <PaymentSuccess />
          // </PayfastGuard>
        ), // Public route// Public route
      },
      {
        path: "/post-job",
        element: (
          <PrivateRoute>
            <CreateJob />
          </PrivateRoute>
        ), // Protected route
      },
      {
        path: "/edit-job/:id",
        element: (
          <PrivateRoute>
            <UpdateJob />
          </PrivateRoute>
        ),
      },
      {
        path: "/jobs/:id",
        element: <JobDetails />, // Public route
      },
    ],
  },
  {
    path: "/login",
    element: <Login />, // Public route
  },
  {
    path: "/signup",
    element: <SignupPage />, // Public route
  },
  {
    path: "/logins",
    element: <Login />,
  },
  {
    path: "/signups",
    element: <SignupPage />,
  },
]);

export default router;
