import { useState } from 'react';
import App from './app.routes';
import Auth from './auth.routes';

import { Route } from "react-router-dom";

const Routes = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Route element={
      <>
        { isLoggedIn ? <Auth /> : <App />}
      </>
    } />
  )
}

export default Routes;