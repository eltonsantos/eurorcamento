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
import { Footer } from './components/Footer';
import { Menu } from './components/Menu';

Modal.setAppElement('#root')

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          {isLoggedIn ? (
            <Route path="/" element={
              <>
                <Login />
                <GlobalStyleLogin />
              </>
            } />
          ) : (
            <Route path="/transactions" element={
              <>
                <Menu />
                <Header
                  onOpenNewTransactionModal={handleOpenNewTransactionModal}
                />
                <Dashboard />
                <NewTransactionModal
                  isOpen={isNewTransactionModalOpen}
                  onRequestClose={handleCloseNewTransactionModal}
                />
                <Footer />
                <GlobalStyle />
              </>
            } />
          )}
        </Routes>
      </BrowserRouter>
    </TransactionsProvider>
  );
}