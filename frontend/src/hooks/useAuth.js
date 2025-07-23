import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const loggedInUser = localStorage.getItem('authUser');
            if (loggedInUser) {
                setUser(JSON.parse(loggedInUser));
            }
        } catch (error) {
            console.error("Failed to parse auth user from localStorage", error);
            localStorage.removeItem('authUser');
        }
    }, []);

    const login = (email) => {
        const userData = { email };
        localStorage.setItem('authUser', JSON.stringify(userData));
        setUser(userData);
        navigate('/');
    };

    const signup = (email) => {
        const userData = { email };
        localStorage.setItem('authUser', JSON.stringify(userData));
        setUser(userData);
        navigate('/');
    };

    const logout = () => {
        localStorage.removeItem('authUser');
        setUser(null);
        navigate('/');
    };

    return { user, login, signup, logout };
};