import React from 'react'

import {createBrowserRouter,} from "react-router-dom";
import App from '../App';
import Home from '../Pages/Home';
import MyJobs from '../Pages/MyJobs';
import SalaryPage from '../Pages/SalaryPage';
import CreateJob from '../Pages/CreateJob';
import UpdateJob from '../Pages/UpdateJob';
import JobDetails from '../Pages/JobDetails';
import Login from '../Pages/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import About from '../Pages/About';
import Contact from '../Pages/Contact';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/about",
            element: <About/>
        },
        {
            path: "/contact",
            element: <Contact/>
        },
        {
            path: "/my-job",
            element: <PrivateRoute><MyJobs/></PrivateRoute>
        },
        {
            path: "/salary",
            element: <SalaryPage/>
        },
        {
          path: "/post-job",
          element: <CreateJob/>
        },
        {
          path: "edit-job/:id",
          element: <UpdateJob/>,
          loader: ({params}) => fetch(`http://localhost:5174/all-jobs/${params.id}`)
        },
        {
          path:"/jobs/:id",
          element: <JobDetails/>,
        }
      ]
    },
    {
      path: "/login",
      element: <Login/>
    }
  ]);

  export default router;