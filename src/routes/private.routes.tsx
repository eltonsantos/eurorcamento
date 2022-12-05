import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoutes = () => {

  const {currentUser} = useAuth();

  console.log(currentUser)

  return currentUser ? <Outlet /> : <Navigate to="/" />
    
}

export default PrivateRoutes;