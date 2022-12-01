import Modal from 'react-modal';
import Rotas from './routes/protected.routes';
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { TransactionsProvider } from './hooks/useTransactions';
import Auth from './routes/auth.routes';
import Application from './routes/app.routes';
import { useState } from 'react';
import ProtectedRoute from './routes/protected.routes';

Modal.setAppElement('#root')

export function App() {

  return (
    <Routes>
      <Route path="/" element={<Application />} />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute />
        }
      />
    </Routes>
  );
}