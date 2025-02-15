import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { WiseModal } from "../WiseModal";
import * as S from "./styles";

export function Menu() {
  const { currentUser, handleLogout } = useAuth();
  const [isWiseModalOpen, setIsWiseModalOpen] = useState(false);

  //const { email } = localStorage.getItem('@eurorcamento:auth')

  return (
    <S.Container>
      <ul>
        <li>Bem vindo, {currentUser.email}</li>
        <li>
          <button onClick={() => setIsWiseModalOpen(true)}>Conta Wise</button>
        </li>
        <li>
          <button onClick={handleLogout}>Sair</button>
        </li>
      </ul>
      <WiseModal
        isOpen={isWiseModalOpen}
        onRequestClose={() => setIsWiseModalOpen(false)}
      />
    </S.Container>
  );
}
