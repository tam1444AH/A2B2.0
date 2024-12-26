import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);
    
    return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;