import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    // const auth = null; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return loading === false && isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;