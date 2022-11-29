import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./styles"

export function Menu() {

  const navigate = useNavigate();

  function logout(event: FormEvent) {
      event.preventDefault();
      console.log('Logout');

      // CLEAR DATA FROM STORAGE
      localStorage.removeItem('@eurorcamento');
      sessionStorage.removeItem('@eurorcamento');

      navigate("/");
  }

  return (
    <S.Container>
      <ul>
        <li>
          <button>Alterar Tema</button>
        </li>
        <li>
          <Link to="#" onClick={logout}>Sair</Link>
        </li>
      </ul>
    </S.Container>
  )

}