import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    const logOut = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };


    return (
        <AuthContext.Provider value={{ isLoggedIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider