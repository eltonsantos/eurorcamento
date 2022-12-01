import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from '../../services/firebaseconfig'
import * as S from "./styles"

export function Menu() {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function logout() {
    await signOut(auth);
    console.log(auth)
    navigate('/')
    setIsLoggedIn(false);
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