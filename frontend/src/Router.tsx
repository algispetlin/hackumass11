import React from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from './pages/LoginPage';
const Authorize = () => {
    const {isAuthenticated} = useAuth0();
    if (isAuthenticated){
        return <Navigate to="/home" />
    }
    return <Navigate to="/login" />
}

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Outlet />,
        children: [
            {
                path: "",
                element: <Authorize />
            },
            {
                path: "/home",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "*",
                element: <Navigate to="/home" />
            }
        ]
    }
])

export default Router

