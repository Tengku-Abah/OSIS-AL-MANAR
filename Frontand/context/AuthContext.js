"use client";

import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        try {
            const data = await api.get('/auth/me');
            setUser(data);
        } catch (error) {
            console.error(error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = (userData) => {
        setUser(userData);
        router.push('/dashboard');
    };

    const logout = async () => {
        try {
            await api.post('/logout', {});
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
