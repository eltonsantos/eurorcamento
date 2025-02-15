import { useState } from "react";
import Modal from "react-modal";
import closeImg from "../../assets/close.svg";
import * as S from "./styles";
import { useWiseTransactions } from "../../hooks/useWiseTransactions";

interface WiseModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function WiseModal({ isOpen, onRequestClose }: WiseModalProps) {
  const { wiseBalance, setWiseBalance, saveWiseBalance } = useWiseTransactions();
  const [inputValue, setInputValue] = useState(String(wiseBalance));

  function handleSaveBalance() {
    const balance = parseFloat(inputValue);
    if (isNaN(balance)) return;

    saveWiseBalance(balance);
    setWiseBalance(balance);
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

        <button type="submit" onClick={handleSaveBalance}>Cadastrar</button>
      </S.Container>
    </Modal>
  );
}