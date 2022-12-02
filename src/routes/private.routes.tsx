import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    isLoggedIn ? <Outlet /> : <Navigate to="/" />
    
  )
}

export default PrivateRoutes;