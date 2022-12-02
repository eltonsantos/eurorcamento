import * as S from "./styles"
import { useAuth } from "../../hooks/useAuth";

export function Menu() {

  const { handleLogout } = useAuth()

  //const { email } = localStorage.getItem('@eurorcamento:auth')

  return (
    <S.Container>
      <ul>
        <li>Bem vindo</li>
        <li>
          <button>Alterar Tema</button>
        </li>
        <li>
        <button onClick={handleLogout}>Sair</button>
        </li>
      </ul>
    </S.Container>
  )

}