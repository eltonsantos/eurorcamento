import { useState } from 'react';
import Modal from 'react-modal';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions';

import { GlobalStyle } from './styles/global';
import { GlobalStyleLogin } from './styles/globalLogin';

Modal.setAppElement('#root')

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  
  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false)
  }
  
  return (
    <TransactionsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Login />
            <GlobalStyleLogin />
          </Route>
          <Route path="/transactions">
            <Header
              onOpenNewTransactionModal={handleOpenNewTransactionModal}
            />
            <Dashboard />
            <NewTransactionModal
              isOpen={isNewTransactionModalOpen}
              onRequestClose={handleCloseNewTransactionModal}
            />
            <GlobalStyle />
          </Route>
        </Routes>
      </BrowserRouter>
    </TransactionsProvider>
  );
}