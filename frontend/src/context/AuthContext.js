// frontend/src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import { login, register } from '../services/authService';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token });
        }
        setLoading(false);
    }, []);

    const handleLogin = async (credentials) => {
        const data = await login(credentials);
        setUser({ token: data.token });
        localStorage.setItem('token', data.token);
    };

    const handleRegister = async (userData) => {
        await register(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, handleLogin, handleRegister, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
