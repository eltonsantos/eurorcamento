import { FormEvent } from 'react';
import Modal from 'react-modal';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import * as S from './styles';

interface UpdateTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function UpdateTransactionModal({ isOpen, onRequestClose }: UpdateTransactionModalProps) {
  
  async function handleUpdateTransaction(event: FormEvent) {}

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