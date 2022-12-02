import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoutes = () => {

  // const { user } = useAuth()
  // console.log("Auth: " + user)

  const isLoggedIn = useAuth();

  return (
    isLoggedIn ? <Outlet /> : <Navigate to="/" />
    
  )
}

export default PrivateRoutes;