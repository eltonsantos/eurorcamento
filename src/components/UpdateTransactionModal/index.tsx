import { ChangeEvent, FormEvent, useState } from 'react';
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

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  //console.log(editingTransaction)
  
  async function handleUpdateTransaction(event: any) {
    event.preventDefault();
    console.log("UpdID" + editingTransaction)
    // await updateTransaction()
    //setEditingTransaction(editingTransaction)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.currentTarget.name === 'title') {
      setTitle(event.target.value)
    }
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
          value={editingTransaction?.title}
          onChange={handleInputChange}
        />

        <input
          type="number"
          placeholder="Valor"
          value={editingTransaction?.amount}
          onChange={e => setTitle(e.target.value)}
        />

        <S.TransactionTypeContainer>
          <S.RadioBox
            type="button"
            isActive={editingTransaction?.type === 'deposit'}
            activeColor="green"
            onClick={() => {setType('deposit')}}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </S.RadioBox>
          <S.RadioBox
            type="button"
            isActive={editingTransaction?.type === 'withdraw'}
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
          value={editingTransaction?.category}
          onChange={e => setTitle(e.target.value)}
        />

        <button type="submit">Atualizar</button>
      
      </S.Container>
    </Modal>
  )
}