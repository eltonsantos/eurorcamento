import { Route, Routes } from 'react-router-dom';

import { Login } from '../components/Login';

import { GlobalStyleLogin } from '../styles/globalLogin';

const AppRoutes = () => {

  return (
    <>
      <Login />
      <GlobalStyleLogin />
    </>
  )
}

export default AppRoutes;