import { FormEvent, useEffect, useState } from "react";
import Modal from "react-modal";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

import * as Yup from "yup";

import { toast } from "react-toastify";

import * as S from "./styles";

import { useTransactions } from "../../hooks/useTransactions";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface UpdateTransactionModalProps {
  isOpen: boolean;
  editingTransaction: Transaction | undefined;
  onRequestClose: () => void;
}

const updateTransactionSchema = Yup.object({
  title: Yup.string().required("Título não pode ficar em branco"),
  amount: Yup.string().required("Valor não pode ficar em branco"),
  category: Yup.string().required("Categoria não pode ficar em branco"),
});

export function UpdateTransactionModal({
  isOpen,
  onRequestClose,
  editingTransaction,
}: UpdateTransactionModalProps) {
  const { updateTransaction } = useTransactions();

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("deposit");

  useEffect(() => {
    if (editingTransaction?.id) {
      setId(editingTransaction.id);
    }
    if (editingTransaction?.title) {
      setTitle(editingTransaction.title);
    }
    if (editingTransaction?.amount) {
      setAmount(editingTransaction.amount);
    }
    if (editingTransaction?.type) {
      setType(editingTransaction.type);
    }
    if (editingTransaction?.category) {
      setCategory(editingTransaction.category);
    }
  }, [editingTransaction]);

  async function handleUpdateTransaction(event: FormEvent) {
    event.preventDefault();

    await updateTransactionSchema
      .validate({
        title,
        amount,
        category,
      })
      .then(() => {
        updateTransaction({
          id,
          title,
          amount,
          category,
          type,
          createdAt: String(new Date()),
        });

        onRequestClose();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <S.Container onSubmit={handleUpdateTransaction}>
        <h2>Atualizar transação</h2>

        <input
          type="text"
          placeholder="Título"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <S.TransactionTypeContainer>
          <S.RadioBox
            type="button"
            isActive={type === "deposit"}
            activeColor="green"
            onClick={() => {
              setType("deposit");
            }}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </S.RadioBox>

          <S.RadioBox
            type="button"
            isActive={type === "withdraw"}
            activeColor="red"
            onClick={() => {
              setType("withdraw");
            }}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </S.RadioBox>
        </S.TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">Atualizar</button>
      </S.Container>
    </Modal>
  );
}
