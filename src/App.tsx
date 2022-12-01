import Modal from 'react-modal';
import Routes from './routes';
import { BrowserRouter } from "react-router-dom"
import { TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement('#root')

export function App() {
  
  return (
    <TransactionsProvider>
      <BrowserRouter>
        <Routes />   
      </BrowserRouter>
    </TransactionsProvider>
  );
}