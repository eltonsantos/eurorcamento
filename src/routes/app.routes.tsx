import { Route } from 'react-router-dom';
import { Login } from '../components/Login';

import { GlobalStyleLogin } from '../styles/globalLogin';

const AppRoutes = () => {
  return (
    <>
      <Route path="/" element={
        <>
          <Login />
          <GlobalStyleLogin />
        </>
      } />
    </>
  )
}

export default AppRoutes;