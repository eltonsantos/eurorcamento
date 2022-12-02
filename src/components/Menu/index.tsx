import { NavLink } from "react-router-dom";
import * as S from "./styles"
import { useAuth } from "../../hooks/useAuth";

export function Menu() {

  const { handleLogout } = useAuth()

  return (
    <S.Container>
      <ul>
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