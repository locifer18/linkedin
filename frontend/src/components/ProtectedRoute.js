import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ children }) => {
    const [auth] = useAuth();
    
    return auth?.user && auth?.token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
