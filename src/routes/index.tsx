import { useState } from 'react';
import App from './app.routes';
import Auth from './auth.routes';

import { Routes as Rots } from "react-router-dom"

const Routes = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Rots>
      { isLoggedIn ? <Auth /> : <App />}
    </Rots>
  )
}

export default Routes;