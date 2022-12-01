import { useState } from 'react';
import App from './app.routes';
import Auth from './auth.routes';

const Routes = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      { isLoggedIn ? <Auth /> : <App />}
    </>
  )
}

export default Routes;