import { useState } from 'react';
import App from './app.routes';
import Auth from './auth.routes';

import { Routes } from "react-router-dom";
const Routes = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      { logged ? <Auth /> : <App />}
    </Routes>
  )
}

export default Routes;