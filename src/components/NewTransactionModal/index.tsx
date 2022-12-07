import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { realTimeDatabase } from '../../services/firebaseconfig'
import { onValue, push, ref, set } from 'firebase/database'

import Modal from 'react-modal';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import * as S from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

  const { createTransaction } = useTransactions()

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    // await createTransaction({
    //   title,
    //   amount,
    //   category,
    //   type
    // })

    const transactionsRef = ref(realTimeDatabase, 'transactions')
    push(transactionsRef, {title, amount, category, type, createdAt: new Date().toString()})
    .then(() => {
      console.log("Salvo no firebase")
    }).catch((error) => {
      console.log(error)
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
    
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

      <S.Container onSubmit={handleCreateNewTransaction}>
        
        <h2>Cadastrar transação</h2>
        
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
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
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>

      </S.Container>
    </Modal>
  )
}