import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoutes = () => {

  const { currentUser } = useAuth();
  //const auth = localStorage.getItem('@eurocamento:auth')

  return (
    !!currentUser ? <Outlet /> : <Navigate to="/" />
    
  )
}

export default PrivateRoutes;