import { useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { NewTransactionModal } from '../components/NewTransactionModal';

import { GlobalStyle } from '../styles/global';

const AuthRoutes = () => {
  
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  
  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false)
  }
  return (
    <Routes>
      <Route path="/transactions" element={
        <>
          <Menu />
          <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
          <Dashboard />
          <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />
          <Footer />
          <GlobalStyle />
        </>
      } />
    </Routes>
  )
}

export default AuthRoutes;