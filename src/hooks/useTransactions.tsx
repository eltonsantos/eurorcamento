/* eslint-disable react-hooks/exhaustive-deps */
import { onValue, push, ref, remove, update } from "firebase/database";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { realTimeDatabase } from "../services/firebaseconfig";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
  removeTransaction: (id: string) => Promise<void>;
  handleRemoveTransaction: (id: string) => void;
  filterTransactions: (id: string) => void;
  isLoading: boolean;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const transactionsRef = ref(realTimeDatabase, "transactions");

  useEffect(() => {
    onValue(transactionsRef, (snapshot) => {
      const data = snapshot.val();
      //console.log(data)
      if (!data) return;
      const keys = data && Object.keys(data);
      const treatData = keys?.map((key: any) => {
        return { ...data[key], id: key };
      });
      setTransactions(treatData);
      setFilteredTransactions(treatData);
      setIsLoading(false);
    });
  }, []);

  function filterTransactions(searchTerm: string) {
    if (!searchTerm) {
      setFilteredTransactions(transactions);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = transactions.filter(
        (transaction) =>
          transaction.title.toLowerCase().includes(lowercasedTerm) ||
          transaction.category.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredTransactions(filtered);
    }
  }

  function handleRemoveTransaction(id: string) {
    const confirmed = window.confirm("Você tem certeza que deseja remover esta transação?");

    if (confirmed) {
      removeTransaction(id);
    }
  }

  async function createTransaction(transactionInput: TransactionInput) {
    await push(transactionsRef, {
      ...transactionInput,
      createdAt: new Date().toString(),
    })
      .then(() => {
        toast.success("Salva com sucesso");
        console.log("Salva no firebase");
      })
      .catch((error) => {
        toast.error(error.message);
        toast.error("Ocorreu um erro ao salvar");
        console.log(error);
      });
  }

  async function updateTransaction(transaction: Transaction) {
    await update(ref(realTimeDatabase, `transactions/${transaction.id}`), {
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
    })
      .then(() => {
        setTransactions(
          transactions.map((t) => (t.id === transaction.id ? transaction : t))
        );
        toast.success("Atualizada com sucesso");
        console.log("Atualizada no firebase");
      })
      .catch((err) => {
        toast.error("Ocorreu um erro ao atualizar");
        console.log(err);
      });
  }

  async function removeTransaction(id: string) {
    await remove(ref(realTimeDatabase, `/transactions/${id}`))
      .then(() => {
        setTransactions((prev) =>
          prev.filter((transaction) => transaction.id !== id)
        );
        toast.success("Removida com sucesso");
        console.log("Removida no firebase");
      })
      .catch((err) => {
        toast.error("Ocorreu um erro ao remover");
        console.log(err);
      });
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        filteredTransactions,
        createTransaction,
        handleRemoveTransaction,
        removeTransaction,
        updateTransaction,
        filterTransactions,
        isLoading,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
