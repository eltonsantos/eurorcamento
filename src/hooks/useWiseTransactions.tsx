/* eslint-disable react-hooks/exhaustive-deps */
import { onValue, ref, set } from "firebase/database";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { realTimeDatabase } from "../services/firebaseconfig";

interface WiseTransactionsContextData {
  wiseBalance: number;
  setWiseBalance: (balance: number) => void;
  saveWiseBalance: (balance: number) => Promise<void>;
}

const WiseTransactionsContext = createContext<WiseTransactionsContextData>(
  {} as WiseTransactionsContextData
);

export function WiseTransactionsProvider({ children }: { children: ReactNode }) {
  const [wiseBalance, setWiseBalance] = useState(0);

  const wiseBalanceRef = ref(realTimeDatabase, "wiseBalance");

  useEffect(() => {
    onValue(wiseBalanceRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setWiseBalance(data.balance);
      }
    });
  }, []);

  async function saveWiseBalance(balance: number) {
    await set(wiseBalanceRef, { balance })
      .then(() => {
        toast.success("Saldo Wise atualizado");
        console.log("Saldo Wise atualizado")
      })
      .catch((error) => {
        toast.error(error.message);
        console.error("Erro ao salvar saldo Wise: ", error)
      });
  }

  return (
    <WiseTransactionsContext.Provider value={{ wiseBalance, setWiseBalance, saveWiseBalance }}>
      {children}
    </WiseTransactionsContext.Provider>
  );
}

export function useWiseTransactions() {
  return useContext(WiseTransactionsContext);
}
