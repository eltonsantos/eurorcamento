import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import * as S from './styles';

import { useTransactions } from '../../hooks/useTransactions';
interface Transaction {
  title: string;
  amount: number;
  type: string;
  category: string;
}
interface UpdateTransactionModalProps {
  isOpen: boolean;
  transaction: string;
  onRequestClose: () => void;
}

export function UpdateTransactionModal({ isOpen, onRequestClose }: UpdateTransactionModalProps) {

  const { updateTransaction } = useTransactions()

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');
  
  const [editingTransaction, setEditingTransaction] = useState<Transaction>()

  console.log(editingTransaction)
  
  async function handleUpdateTransaction(event: FormEvent) {
    event.preventDefault();
    // await updateTransaction()
    setEditingTransaction(editingTransaction)
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
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
        />

        <S.TransactionTypeContainer>
          <S.RadioBox
            type="button"
            // activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </S.RadioBox>
          <S.RadioBox
            type="button"
            // activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </S.RadioBox>
        </S.TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
        />

        <button type="submit">Atualizar</button>
      
      </S.Container>
    </Modal>
  )
}