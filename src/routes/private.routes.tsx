import { Navigate, Outlet } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { useAuth } from '../hooks/useAuth';

const PrivateRoutes = () => {

  const {currentUser, isLoading } = useAuth();

  console.log(currentUser)

  if (isLoading) {
    return <Loading />
  }
  
  return currentUser ? <Outlet /> : <Navigate to="/" />
  //return currentUser ? <Outlet /> : <h1>Carregando...</h1>
  // return currentUser ? <Outlet /> : <Loading />
    
}

export default PrivateRoutes;