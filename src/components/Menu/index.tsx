import { useAuth } from "../../hooks/useAuth";
import * as S from "./styles";

export function Menu() {
  const { currentUser, handleLogout } = useAuth();

  //const { email } = localStorage.getItem('@eurorcamento:auth')

  return (
    <S.Container>
      <ul>
        <li>Bem vindo, {currentUser.email}</li>
        {/* <li>
          <button>Alterar Tema</button>
        </li> */}
        <li>
          <button onClick={handleLogout}>Sair</button>
        </li>
      </ul>
    </S.Container>
  );
}
