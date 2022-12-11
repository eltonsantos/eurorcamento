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
  removeTransaction: (id: string) => Promise<void>;
  updateTransaction: (id: string) => Promise<void>;
  isLoading: boolean;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
 
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const transactionsRef = ref(realTimeDatabase, 'transactions')

  useEffect(() => {
    onValue(transactionsRef, snapshot => {
      const data = snapshot.val()
      console.log(data)
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
    push(transactionsRef, {
      ...transactionInput,
      createdAt: new Date().toString()})
    .then(() => {
      toast.success('Salvo com sucesso');
      console.log("Salvo no firebase")
    }).catch((error) => {
      toast.error('Ocorreu um erro ao salvar');
      console.log(error)
    })
  }

  async function updateTransaction(id: string) {
    // Como criar essa função?
    try {
      await update(ref(realTimeDatabase, `/${id}`), {
        transactions,
        id,
      });
      toast.success('Atualizado com sucesso');

    } catch (err) {
      toast.error('Ocorreu um erro ao atualizar');
      console.log(err);
    }
  }
  
  async function removeTransaction(id: string) {
    try {
      await remove(ref(realTimeDatabase, `/transactions/${id}`))
      toast.success('Removido com sucesso');
    } catch (err) {
      toast.error('Ocorreu um erro ao remover');
      console.log(err);
    }
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