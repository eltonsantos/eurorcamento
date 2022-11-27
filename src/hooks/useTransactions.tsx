import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  removeTransaction: (id: number) => Promise<void>;
  updateTransaction: (id: number) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
 
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Como usar o isLoading?

  useEffect(() => {
    api.get('transactions').then(response => setTransactions(response.data.transactions))
    setIsLoading(false)
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    });
    
    const { transaction } = response.data
    setTransactions([...transactions, transaction])
  }

  async function updateTransaction(id: number) {
    // Como criar essa função?
  }
  
  // Vejo meu async/await não servindo pra nada, rsrs
  async function removeTransaction(id: number) {
    await api.delete(`/transactions/${id}`); // Não entendi por que não serviu de nada
    const filteredTransaction = transactions.filter(transaction => transaction.id !== id)
    console.log(filteredTransaction)
    setTransactions(filteredTransaction)
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction, removeTransaction, updateTransaction}}>
      { children }
    </TransactionsContext.Provider>
  )
  
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  return context
}