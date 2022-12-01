import { Route, Routes } from 'react-router-dom';

import { Login } from '../components/Login';

import { GlobalStyleLogin } from '../styles/globalLogin';

const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={
        <>
          <Login />
          <GlobalStyleLogin />
        </>
      } />
    </Routes>
  )
}

export default AppRoutes;