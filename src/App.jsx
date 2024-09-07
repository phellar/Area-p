import { useState } from 'react'
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import AdminDashboard from './Pages/AdminDashboard'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'


function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Login/>
      ),
    },
    {
      path: "register",
      element: <Register/>,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "admin-dashboard",
      element: <AdminDashboard />,
    },
  ]);
  

  return<RouterProvider router={router} />;
  
  
  
}

export default App
