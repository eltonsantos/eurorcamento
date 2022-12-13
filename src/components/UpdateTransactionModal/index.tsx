import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import * as S from './styles';

import { useTransactions } from '../../hooks/useTransactions';

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

export function UpdateTransactionModal({ isOpen, onRequestClose, editingTransaction }: UpdateTransactionModalProps) {

  const { updateTransaction } = useTransactions()

  const [title, setTitle] = useState(editingTransaction?.title);
  const [amount, setAmount] = useState(editingTransaction?.amount);
  const [category, setCategory] = useState(editingTransaction?.category);
  const [type, setType] = useState(editingTransaction?.type);

  // const [transaction, setTransaction] = useState({
  //   title: editingTransaction?.title,
  //   amount: editingTransaction?.amount,
  //   type: editingTransaction?.type,
  //   category: editingTransaction?.category
  // })

  // useEffect(() => {
  //   setTransaction({
  //     ...transaction,
  //     title: editingTransaction?.title,
  //     amount: editingTransaction?.amount,
  //     type: editingTransaction?.type,
  //     category: editingTransaction?.category
  //   })
  // },[editingTransaction])
  
  // async function handleUpdateTransaction(event: FormEvent) {
  //   event.preventDefault();
  //   await updateTransaction({...transaction})
  //   setTransaction()
  // }

  async function handleUpdateTransaction(event: FormEvent) {
    event.preventDefault();
  }

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setTransaction({
  //     ...transaction,
  //     [e.target.name]: e.target.value
  //   });
  // }

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
          onChange={e => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          name="amount"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />

        <S.TransactionTypeContainer>
          <S.RadioBox
            type="button"
            isActive={type === 'deposit'}
            activeColor="green"
            onClick={() => {setType('deposit')}}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </S.RadioBox>
          <S.RadioBox
            type="button"
            isActive={type === 'withdraw'}
            activeColor="red"
            onClick={() => {setType('withdraw')}}
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
          onChange={e => setCategory(e.target.value)}
        />

        <button type="submit">Atualizar</button>
      
      </S.Container>
    </Modal>
  )
}