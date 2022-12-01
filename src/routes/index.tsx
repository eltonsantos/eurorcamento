import { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import App from './app.routes';
import Auth from './auth.routes';

const Rotas = () => {

  return (
    <Routes>
      <Route path="/transactions" element={<Auth />} />
    </Routes>
  )
}

export default Rotas;