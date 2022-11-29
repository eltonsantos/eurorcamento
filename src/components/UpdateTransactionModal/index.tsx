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
  onRequestClose: () => void;
}

export function UpdateTransactionModal({ isOpen, onRequestClose }: UpdateTransactionModalProps) {

  const { updateTransaction } = useTransactions()
  
  const [editingTransaction, setEditingTransaction] = useState<Transaction>()
  
  async function handleUpdateTransaction(event: FormEvent) {
    event.preventDefault()
    onRequestClose()
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

        
      
      </S.Container>
    </Modal>
  )
}