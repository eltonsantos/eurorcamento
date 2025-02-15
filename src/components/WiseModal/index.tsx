import { FormEvent, useEffect, useState } from "react";
import { useWiseTransactions } from "../../hooks/useWiseTransactions";

import Modal from "react-modal";

import closeImg from "../../assets/close.svg";

import { toast } from "react-toastify";
import * as S from "./styles";

interface WiseModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function WiseModal({ isOpen, onRequestClose }: WiseModalProps) {
  const { wiseBalance, setWiseBalance, saveWiseBalance } = useWiseTransactions();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (isOpen) {
      setInputValue(String(wiseBalance));
    }
  }, [isOpen, wiseBalance]);

  async function handleSaveBalance(event: FormEvent) {
    event.preventDefault();

    const balance = parseFloat(inputValue);
    if (isNaN(balance)) {
      toast.error("Insira um valor válido.");
      return;
    }

    try {
      await saveWiseBalance(balance);
      setWiseBalance(balance);
      onRequestClose();
    } catch (error) {
      console.error("Erro ao salvar saldo Wise: ", error);
      toast.error("Ocorreu um erro ao salvar o saldo.");
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

      <S.Container>
        <h2>Saldo Conta Wise</h2>
        <input
          type="text"
          placeholder="Saldo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button type="submit" onClick={handleSaveBalance}>Atualizar</button>
      </S.Container>
    </Modal>
  );
}