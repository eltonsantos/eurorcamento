import { useState } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import App from './app.routes';
import Auth from './auth.routes';

const ProtectedRoute = ({ children }: any) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    isLoggedIn ? <Auth /> : <Navigate to="/" />
    
  )
}

export default ProtectedRoute;