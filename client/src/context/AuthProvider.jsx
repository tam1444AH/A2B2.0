import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = localStorage.getItem("authToken");
        return !!token;
    });

    const logOut = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;