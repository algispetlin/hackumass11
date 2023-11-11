import React from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Outlet />,
        children: [
            {
                path: "",
                element: <Navigate to="/home" />
            },
            {
                path: "/home",
                element: <HomePage />
            },
            {
                path: "*",
                element: <Navigate to="/home" />
            }
        ]
    }
])

export default Router