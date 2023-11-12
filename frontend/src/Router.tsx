import React from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TestPage from './pages/TestPage';

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
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/test",
                element: <TestPage />
            },
            {
                path: "*",
                element: <Navigate to="/home" />
            }
        ]
    }
])

export default Router