import Modal from 'react-modal';
import Rotas from './routes';
import { Routes, Route, Outlet } from "react-router-dom";
import { TransactionsProvider } from './hooks/useTransactions';
import { useState } from 'react';

Modal.setAppElement('#root')

export function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      { isLoggedIn ? <Outlet /> : <App />}
    </>
  );
}