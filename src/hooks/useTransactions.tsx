import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { realTimeDatabase } from '../services/firebaseconfig'
import { onValue, push, ref, remove, update } from 'firebase/database'
import { toast } from 'react-toastify'

interface Transaction {
  id: string;
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
  updateTransaction: (transaction: Transaction) => Promise<void>;
  removeTransaction: (id: string) => Promise<void>;
  isLoading: boolean;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
 
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionUpdate, setTransactionUpdate] = useState<Transaction | null>(null);

  const transactionsRef = ref(realTimeDatabase, 'transactions')

  useEffect(() => {
    onValue(transactionsRef, snapshot => {
      const data = snapshot.val()
      //console.log(data)
      if (!data) return
      const keys = data && Object.keys(data)
      const treatData = keys?.map((key: any) => {
        return { ...data[key], id: key }
      })
      setTransactions(treatData)
      setIsLoading(false)
    })
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    await push(transactionsRef, {
      ...transactionInput,
      createdAt: new Date().toString()})
    .then(() => {
      toast.success('Salva com sucesso');
      console.log("Salva no firebase")
    }).catch((error) => {
      toast.error('Ocorreu um erro ao salvar');
      console.log(error)
    })
  }

  async function updateTransaction(transaction: Transaction) {
    console.log("ID1: " + transactionUpdate?.id)
    console.log("ID2: " + transaction.id)
    await update(ref(realTimeDatabase, `transactions/${transaction.id}`), {
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category
    }).then(() => {
      setTransactions(transactions.map((transaction) => transaction.id === transactionUpdate?.id ? transactionUpdate : transaction ))
      //setTransactions(transactions)
      toast.success('Atualizada com sucesso')
      console.log('Atualizada no firebase');

    }).catch((err) => {
      toast.error('Ocorreu um erro ao atualizar')
      console.log(err);
    })
  }
  
  async function removeTransaction(id: string) {
    await remove(ref(realTimeDatabase, `/transactions/${id}`))
      .then(() => {
        setTransactions(prev => prev.filter((transaction) => transaction.id !== id))
        toast.success('Removida com sucesso')
        console.log("Removida no firebase")
      })
      .catch((err) => {
        toast.error('Ocorreu um erro ao remover');
        console.log(err);
      })
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction, removeTransaction, updateTransaction, isLoading}}>
      { children }
    </TransactionsContext.Provider>
  )
  
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  return context
}