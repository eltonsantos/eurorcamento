import Modal from 'react-modal';
import { Routes, Route } from "react-router-dom";
import AuthRoutes from './routes/auth.routes';
import AppRoutes from './routes/app.routes';
import PrivateRoutes from './routes/private.routes';
import PublicRoutes from './routes/public.routes';

Modal.setAppElement('#root')

export function App() {

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/transactions" element={<AuthRoutes />} />
      </Route>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<AppRoutes />} />
      </Route>
    </Routes>
  );
}