import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoutes = () => {

  //const { isLoggedIn } = useAuth();
  const auth = localStorage.getItem('@eurocamento:auth')

  return (
    auth ? <Outlet /> : <Navigate to="/" />
    
  )
}

export default PrivateRoutes;