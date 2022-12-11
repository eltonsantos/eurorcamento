import { useState } from 'react';

import { Dashboard } from '../components/Dashboard';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { NewTransactionModal } from '../components/NewTransactionModal';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    <>
      <Menu />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <ToastContainer />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal} />
      <Footer />
      <GlobalStyle />
    </>
  )
}

export default AuthRoutes;